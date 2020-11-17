import { Arg, Int, Mutation, Query, Resolver, InputType, Field } from "type-graphql";
import { Transaction } from '../entities/Transaction';
// import { MyContext } from "src/types";

@InputType()
class TransactionInput {
  @Field()
  text: string;
  @Field()
  category: string;
}

@Resolver()
export class TransactionResolver {

  @Query(() => String)
  hello() {
    return "hello world";
  }

  // New Transaction
  @Mutation(() => Transaction)
  async newTransaction(
    @Arg("input") input: TransactionInput,
  ): Promise<Transaction> {
    return Transaction.create({
      ...input
    }).save();
  }

  // Get All Transactions
  @Query(() => [Transaction])
  async transactions(): Promise<Transaction[]> {
    return Transaction.find();
  }

  // Get Single Transaction
  @Query(() => Transaction, { nullable: true })
  transaction(@Arg("id", () => Int) id: number): Promise<Transaction | undefined> {
    return Transaction.findOne(id);
  }

  // Delete Transaction
  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => Int) id: number,
  ): Promise<boolean> {
    await Transaction.delete({ id });
    return true;
  }

}

