import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  InputType,
  Field,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Transaction } from "../entities/Transaction";

@InputType()
class TransactionInput {
  @Field()
  amount: number;
  @Field()
  transactionType: string;
  @Field()
  memo: string;
}

@Resolver()
export class TransactionResolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }

  // Get All Transactions
  @Query(() => [Transaction])
  async allTransactions(): Promise<Transaction[]> {
    return Transaction.find();
  }

  // Get Single Transaction
  @Query(() => Transaction, { nullable: true })
  transaction(
    @Arg("id", () => Int) id: number
  ): Promise<Transaction | undefined> {
    return Transaction.findOne(id);
  }

  // Create New Transaction
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("input") input: TransactionInput
  ): Promise<Transaction> {
    return Transaction.create({
      ...input,
    }).save();
  }

  // Update Transaction
  @Mutation(() => Transaction, { nullable: true })
  async updateTransaction(
    @Arg("id", () => Int) id: number,
    @Arg("amount", () => Int) amount: number,
    @Arg("transactionType") transactionType: string,
    @Arg("memo") memo: string
  ): Promise<Transaction | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Transaction)
      .set({ amount, transactionType, memo })
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  // Delete Transaction
  @Mutation(() => Boolean)
  async deleteTransaction(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Transaction.delete({ id });
    return true;
  }
}
