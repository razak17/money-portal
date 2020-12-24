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
import { Transaction } from "../entities/Transaction";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { BankAccount } from "../entities/BankAccount";
import { TransactionCategory } from "../entities/TransactionCategory";
import { TransactionOptions  } from "../types";
import { getTransactionsController } from "../controllers/getTransactionsController"
import { createTransactionController } from "../controllers/createTransactionController"
import { searchTransactionsController } from "../controllers/searchTransactionsController"
import { updateTransactionController  } from "../controllers/updateTransactionController"
import { totalTransactionsController  } from "../controllers/totalTransactionsController"
import { deleteTransactionController  } from "../controllers/deleteTransactionController"

@InputType()
export class TransactionInput {
  @Field()
  amount: number;
  @Field()
  type: TransactionOptions;
  @Field()
  memo: string;
}

@InputType()
export class getTransactionInput {
  @Field()
  bankAccountId: number;
  @Field()
  limit: number;
  @Field()
  offset: string;
  @Field(() => String, {nullable: true})
  filter?: string;
  @Field()
  query?: string;
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
export class TransactionResponse {
  @Field(() => Transaction, { nullable: true })
  transaction?: Transaction | null;

  @Field(() => [TransactionError], { nullable: true })
  errors?: TransactionError[];
}

@ObjectType()
export class PaginatedTransactionsResponse {
  @Field(() => PaginatedTransactions, { nullable: true })
  paginatedTransactions?: PaginatedTransactions | null;

  @Field(() => [TransactionError], { nullable: true })
  errors?: TransactionError[];
}

@ObjectType()
export class TotalTransactionsResponse {
  @Field(() => Number, { nullable: true })
  count?: number | null;

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
  @Query(() => TotalTransactionsResponse)
  @UseMiddleware(isAuth)
  async totalTransactions(
    @Ctx() { req }: MyContext,
    @Arg("filter", () => String, { nullable: true })
    filter: string | null,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("query", () => String, { nullable: true })
    query: string | null,
  ): Promise<TotalTransactionsResponse> {
    const { userId } = req.session;

    const res = totalTransactionsController(userId, bankAccountId, filter, query);
    return res;
  }

  // Search Transaction
  @Query(() => PaginatedTransactionsResponse)
  @UseMiddleware(isAuth)
  async searchTransaction(
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int) offset: number,
    @Arg("query", () => String) query: string,
    @Arg("filter", () => String, { nullable: true })
    filter: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedTransactionsResponse> {
    const { userId } = req.session;

    const res = searchTransactionsController(bankAccountId, userId, limit, filter, query, offset);
    return res;
  }

  // Get All Transactions
  @Query(() => PaginatedTransactionsResponse)
  @UseMiddleware(isAuth)
  async transactions(
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int) offset: number,
    @Arg("filter", () => String, { nullable: true })
    filter: string | null,
    @Arg("query", () => String, { nullable: true })
    query: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedTransactionsResponse | undefined> {
    const { userId } = req.session;

    const res = getTransactionsController(bankAccountId, userId, limit, offset, filter, query)
    return res;
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

    const res = createTransactionController(input, bankAccountId, userId);
    return res;

  }

  // Update Transaction
  @Mutation(() => TransactionResponse)
  @UseMiddleware(isAuth)
  async updateTransaction(
    @Arg("input") input: TransactionInput,
    @Arg("bankAccountId", () => Int) bankAccountId: number,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<TransactionResponse> {
    const { userId } = req.session;

    const res = updateTransactionController(
      input,
      bankAccountId,
      userId,
      id,
    );

    return res;
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

    return deleteTransactionController(id, bankAccountId, userId)
  }
}
