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
import { TransactionCategory } from "../entities/TransactionCategory";
import { TransactionOptions, withdrawalOptions, FilterOptions } from "../types";
import {
  newDeposit,
  newTransfer,
  newWithdrawal,
} from "../utils/calculateStats";
import {
  updateDeposit,
  updateTransfer,
  updateWithdrawal,
} from "../utils/updateStats";
import {
  deleteDeposit,
  deleteTransfer,
  deleteWithdrawal,
} from "../utils/deleteStats";

@InputType()
export class TransactionInput {
  @Field()
  amount: number;
  @Field()
  type: TransactionOptions;
  @Field()
  memo: string;
}

@ObjectType()
class TransactionError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class PaginatedTransactions {
  @Field(() => [Transaction])
  transactions: Transaction[];
  @Field()
  hasMore: boolean;
}

@ObjectType()
class TransactionResponse {
  @Field(() => Transaction, { nullable: true })
  transaction?: Transaction | null;

  @Field(() => [TransactionError], { nullable: true })
  errors?: TransactionError[];
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

  // Get Transaction Category
  @FieldResolver(() => TransactionCategory)
  category(
    @Root() transaction: Transaction,
    @Ctx() { transactionCategoryLoader }: MyContext
  ) {
    return transactionCategoryLoader.load(transaction.categoryId);
  }

  // Total Transactions
  @Query(() => Number)
  @UseMiddleware(isAuth)
  async totalTransactions(
    @Ctx() { req }: MyContext,
    @Arg("filter", () => String, { nullable: true })
    filter: string | null,
    @Arg("bankAccountId", () => Int) bankAccountId: number
  ): Promise<number> {
    const { userId } = req.session;
    let replacements: any[] = [userId, bankAccountId];

    if (filter && filter != "all") {
      console.log("FILTER", filter);
      if (filter === FilterOptions.TRANSFERS) {
        replacements.push(3);
      } else if (filter === FilterOptions.DEPOSITS) {
        replacements.push(2);
      } else if (filter === FilterOptions.WITHDRAWALS) {
        replacements.push(1);
      }
    }

    const transactions = await getConnection().query(
      `
    select t.*
    from transaction t
    ${
      filter && filter != "all"
        ? `where t."creatorId" = $1 and t."bankAccountId" = $2 and t."categoryId" = $3`
        : `where t."creatorId" = $1 and t."bankAccountId" = $2`
    }
    order by t."createdAt"
    `,
      replacements
    );
    return transactions.length;
  }

  // Get All Transactions
  @Query(() => PaginatedTransactions)
  @UseMiddleware(isAuth)
  async transactions(
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("filter", () => String, { nullable: true })
    filter: string | null,
    @Arg("search", () => String, { nullable: true })
    search: string | null,
    @Arg("offset", () => Int) offset: number,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedTransactions> {
    const { userId } = req.session;

    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const page = (offset - 1) * limit;
    const replacements: any[] = [reaLimitPlusOne, userId, bankAccountId, page];

    if ((filter && filter != "all") && (search && search.trim().length)) {
      replacements.push(`%${search}%`)
      if (filter === FilterOptions.TRANSFERS) {
        replacements.push(3);
      } else if (filter === FilterOptions.DEPOSITS) {
        replacements.push(2);
      } else if (filter === FilterOptions.WITHDRAWALS) {
        replacements.push(1);
      }
    }
    else if (filter && filter != "all") {
      if (filter === FilterOptions.TRANSFERS) {
        replacements.push(3);
      } else if (filter === FilterOptions.DEPOSITS) {
        replacements.push(2);
      } else if (filter === FilterOptions.WITHDRAWALS) {
        replacements.push(1);
      }
    }
    else if (search && search.trim().length) {
      replacements.push(`%${search}%`)
      console.log('SEARCH', replacements[4]);
    }

    const transactions = await getConnection().query(
      `
    select t.*
    from transaction t
    ${
      (search && search.trim().length) && (filter && filter != "all") ?
        `where t."creatorId" = $2 and t."bankAccountId" = $3 and t."memo" like $5 and t."categoryId" = $6` :
      search && search.trim().length ?
        `where t."creatorId" = $2 and t."bankAccountId" = $3 and t."memo" like $5` :
      filter && filter != "all"
        ? `where t."creatorId" = $2 and t."bankAccountId" = $3 and t."categoryId" = $5`
        : `where t."creatorId" = $2 and t."bankAccountId" = $3`
    }
    order by t."createdAt" DESC
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
  @Mutation(() => TransactionResponse)
  @UseMiddleware(isAuth)
  async newTransaction(
    @Arg("input") input: TransactionInput,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Ctx() { req }: MyContext
  ): Promise<TransactionResponse> {
    const { userId } = req.session;

    let categoryId;

    if (input.type === TransactionOptions.TRANSFER) {
      categoryId = 3;
    }
    else if (input.type === TransactionOptions.DEPOSIT) {
      categoryId = 2;
    }
    else if (input.type && withdrawalOptions.includes(input.type)) {
      categoryId = 1;
    }

    const res = await getConnection().query(
      `
      select "currentBalance"
      from bank_account
      where bank_account.id = $1
      and bank_account."creatorId" = $2
      `,
      [bankAccountId, userId]
    )

    console.log(res);
    const  currentBalance = Object.values(res[0])[0] as number;

    if(input.amount > currentBalance && withdrawalOptions.includes(input.type)) {
      return {
        errors: [
          {
            field: 'amount',
            message: 'not enough funds.'
          }
        ]
      }
    }

    if(input.memo.trim().length === 0) {
      return {
        errors: [
          {
            field: 'memo',
            message: 'must not be empty.'
          }
        ]
      }
    }

    const transaction = await Transaction.create({
      ...input,
      creatorId: userId,
      bankAccountId,
      categoryId,
    }).save();

    if (input.type === TransactionOptions.DEPOSIT) {
      newDeposit(input.amount, bankAccountId, userId);
    } else if (input.type === TransactionOptions.TRANSFER) {
      newTransfer(input.amount, bankAccountId, userId);
    } else if (input.type && withdrawalOptions.includes(input.type)) {
      newWithdrawal(input.amount, bankAccountId, userId);
    }

    return { transaction };
  }

  // Update Transaction
  @Mutation(() => Transaction, { nullable: true })
  @UseMiddleware(isAuth)
  async updateTransaction(
    @Arg("id", () => Int) id: number,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("amount") amount: number,
    @Arg("type") type: TransactionOptions,
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
      oldTransaction &&
      withdrawalOptions.includes(oldTransaction?.type)
    ) {
      updateWithdrawal(
        oldTransaction.amount,
        amount,
        type,
        bankAccountId,
        userId
      );
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
    } else if (transaction && withdrawalOptions.includes(transaction?.type)) {
      deleteWithdrawal(transaction.amount, bankAccountId, userId);
    }

    return true;
  }
}
