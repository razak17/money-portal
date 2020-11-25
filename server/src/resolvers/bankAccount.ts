import {
  Arg,
  Mutation,
  Resolver,
  InputType,
  Field,
  Query,
  Int,
} from "type-graphql";
import { getConnection } from "typeorm";
import { BankAccount } from "../entities/BankAccount";

@InputType()
class BankAccountInput {
  @Field()
  name: string;
  @Field()
  type: string;
  @Field()
  startingBalance: number;
  @Field()
  lowBalanceAlert: number;
}

@Resolver()
export class BankAccountResolver {
  // Get All Accounts
  @Query(() => [BankAccount])
  async bankAccounts(): Promise<BankAccount[]> {
    return BankAccount.find();
  }

  // Get Single Account
  @Query(() => BankAccount, { nullable: true })
  bankAccount(
    @Arg("id", () => Int) id: number
  ): Promise<BankAccount | undefined> {
    return BankAccount.findOne(id);
  }

  // Create New Account
  @Mutation(() => BankAccount)
  async newBankAccount(
    @Arg("input") input: BankAccountInput
  ): Promise<BankAccount> {
    return BankAccount.create({
      ...input,
    }).save();
  }

  // Update Account
  @Mutation(() => BankAccount, { nullable: true })
  async updateBankAccount(
    @Arg("id", () => Int!) id: number,
    @Arg("name") name: string,
    @Arg("type") type: string,
    @Arg("lowBalanceAlert", () => Int) lowBalanceAlert: number
  ): Promise<BankAccount | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(BankAccount)
      .set({ name, type, lowBalanceAlert })
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  // Delete Account
  @Mutation(() => Boolean)
  async deleteBankAccount(@Arg("id", () => Int) id: number): Promise<boolean> {
    await BankAccount.delete({ id });
    return true;
  }
}
