import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Transaction } from "../entities/Transaction";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { BankAccount } from "../entities/BankAccount";
import { transactionType, TransactionOptions } from "../types";
import { newDeposit, newTransfer, newOther } from "../utils/calculateStats";
import {
  updateDeposit,
  updateTransfer,
  updateOther,
} from "../utils/updateStats";
import {
  deleteDeposit,
  deleteTransfer,
  deleteOther,
} from "../utils/deleteStats";

@InputType()
export class TransactionInput {
  @Field()
  amount: number;
  @Field()
  type: transactionType;
  @Field()
  memo: string;
}

@ObjectType()
class PaginatedTransactions {
  @Field(() => [Transaction])
  transactions: Transaction[];
  @Field()
  hasMore: boolean;
}

@Resolver(Transaction)
export class TransactionResolver {
  // Get Transaction Creator
  @FieldResolver(() => User)
  creator(@Root() transaction: Transaction, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(transaction.creatorId);
  }

  // Get Transaction BankAccount
  @FieldResolver(() => BankAccount)
  bankAccount(
    @Root() transaction: Transaction,
    @Ctx() { bankAccountLoader }: MyContext
  ) {
    return bankAccountLoader.load(transaction.bankAccountId);
  }

  // Total Transactions
  @Query(() => Number)
  @UseMiddleware(isAuth)
  async totalTransactions(
    @Ctx() { req }: MyContext,
    @Arg("bankAccountId", () => Int) bankAccountId: number
  ): Promise<number> {
    const { userId } = req.session;
    // const bankAccounts =  BankAccount.find({creatorId: userId});
    const transactions = await getConnection().query(
      `
    select t.*
    from transaction t 
    where t."creatorId" = $1 and t."bankAccountId" = $2
    order by t."creatorId" 
    `,
      [userId, bankAccountId]
    );

    return transactions.length;
  }

  // Get All Transactions
  @Query(() => PaginatedTransactions)
  @UseMiddleware(isAuth)
  async transactions(
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset: number | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedTransactions> {
    const { userId } = req.session;

    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const replacements: any[] = [reaLimitPlusOne, userId, bankAccountId];

    if (offset) {
      const page = (offset - 1) * limit;
      replacements.push(page);
    }

    const transactions = await getConnection().query(
      `
    select t.*
    from transaction t 
    ${
      offset
        ? `where t."creatorId" = $2 and t."bankAccountId" = $3`
        : `where t."creatorId" = $2 and t."bankAccountId" = $3`
    }
    order by t."createdAt"
    limit $1
    offset $4
    `,
      replacements
    );

    return {
      transactions: transactions.slice(0, realLimit),
      hasMore: transactions.length === reaLimitPlusOne,
    };
  }

  // Get Single Transaction
  @Query(() => Transaction, { nullable: true })
  @UseMiddleware(isAuth)
  transaction(
    @Arg("id", () => Int) id: number,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Ctx() { req }: MyContext
  ): Promise<Transaction | undefined> {
    const { userId } = req.session;

    return Transaction.findOne({
      where: { id, bankAccountId, creatorId: userId },
    });
  }

  // Create New Transaction
  @Mutation(() => Transaction)
  @UseMiddleware(isAuth)
  async newTransaction(
    @Arg("input") input: TransactionInput,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Ctx() { req }: MyContext
  ): Promise<Transaction> {
    const { userId } = req.session;

    const transaction = await Transaction.create({
      ...input,
      creatorId: userId,
      bankAccountId,
    }).save();

    if (input.type === TransactionOptions.DEPOSIT) {
      newDeposit(input.amount, bankAccountId, userId);
    } else if (input.type === TransactionOptions.TRANSFER) {
      newTransfer(input.amount, bankAccountId, userId);
    } else if (
      input.type === TransactionOptions.CASH_WITHDRAWAL ||
      input.type === TransactionOptions.CARD_NUMBER_ENTERED ||
      input.type === TransactionOptions.CHECK ||
      input.type === TransactionOptions.POINT_OF_SALE
    ) {
      newOther(input.amount, bankAccountId, userId);
    }

    return transaction;
  }

  // Update Transaction
  @Mutation(() => Transaction, { nullable: true })
  @UseMiddleware(isAuth)
  async updateTransaction(
    @Arg("id", () => Int) id: number,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("amount") amount: number,
    @Arg("type") type: transactionType,
    @Arg("memo") memo: string,
    @Ctx() { req }: MyContext
  ): Promise<Transaction | null> {
    const { userId } = req.session;

    const oldTransaction = await Transaction.findOne({
      where: { id, creatorId: userId, bankAccountId },
    });

    const result = await getConnection()
      .createQueryBuilder()
      .update(Transaction)
      .set({ amount, type, memo })
      .where(
        "id = :id and bankAccountId = :bankAccountId and creatorId = :creatorId",
        {
          id,
          creatorId: userId,
          bankAccountId,
        }
      )
      .returning("*")
      .execute();

    if (oldTransaction?.type === TransactionOptions.DEPOSIT) {
      updateDeposit(oldTransaction.amount, amount, type, bankAccountId, userId);
    } else if (oldTransaction?.type === TransactionOptions.TRANSFER) {
      updateTransfer(amount, type, bankAccountId, userId);
    } else if (
      oldTransaction?.type === TransactionOptions.CASH_WITHDRAWAL ||
      oldTransaction?.type === TransactionOptions.CARD_NUMBER_ENTERED ||
      oldTransaction?.type === TransactionOptions.CHECK ||
      oldTransaction?.type === TransactionOptions.POINT_OF_SALE
    ) {
      updateOther(oldTransaction.amount, amount, type, bankAccountId, userId);
    }

    return result.raw[0];
  }

  // Delete Transaction
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTransaction(
    @Arg("id", () => Int) id: number,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { userId } = req.session;

    const transaction = await Transaction.findOne({
      where: { id, creatorId: userId, bankAccountId },
    });

    await Transaction.delete({ id, creatorId: userId, bankAccountId });

    if (transaction?.type === TransactionOptions.DEPOSIT) {
      deleteDeposit(transaction.amount, bankAccountId, userId);
    } else if (transaction?.type === TransactionOptions.TRANSFER) {
      deleteTransfer(bankAccountId, userId);
    } else if (
      transaction?.type === TransactionOptions.CASH_WITHDRAWAL ||
      transaction?.type === TransactionOptions.CARD_NUMBER_ENTERED ||
      transaction?.type === TransactionOptions.CHECK ||
      transaction?.type === TransactionOptions.POINT_OF_SALE
    ) {
      deleteOther(transaction.amount, bankAccountId, userId);
    }

    return true;
  }
}
