import {
  Arg,
  Mutation,
  Resolver,
  InputType,
  Field,
  Query,
  Int,
  Ctx,
  UseMiddleware,
  Root,
  FieldResolver,
  ObjectType,
} from "type-graphql";
import { getConnection } from "typeorm";
import { BankAccount } from "../entities/BankAccount";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { accountType } from "../types";

@InputType()
class BankAccountInput {
  @Field()
  name: string;
  @Field()
  type: accountType;
  @Field()
  startingBalance: number;
  @Field()
  lowBalanceAlert: number;
}

@ObjectType()
class PaginatedBankAccounts {
  @Field(() => [BankAccount])
  bankAccounts: BankAccount[];
  @Field()
  hasMore: boolean;
}

@Resolver(BankAccount)
export class BankAccountResolver {
  // Get bankAccount creator
  @FieldResolver(() => User)
  creator(@Root() bankAccount: BankAccount, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(bankAccount.creatorId);
  }

  // Get All Accounts
  @Query(() => PaginatedBankAccounts)
  @UseMiddleware(isAuth)
  async bankAccounts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedBankAccounts> {
    const { userId } = req.session;

    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const replacements: any[] = [reaLimitPlusOne, userId];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const bankAccounts = await getConnection().query(
      `
    select b.*
    from bank_account b 
    ${
      cursor
        ? `where b."creatorId" = $2, and b."createdAt" < $5`
        : `where b."creatorId" = $2`
    }
    order by b."createdAt" DESC
    limit $1
    `,
      replacements
    );

    return {
      bankAccounts: bankAccounts.slice(0, realLimit),
      hasMore: bankAccounts.length === reaLimitPlusOne,
    };
  }

  // Get Single Account
  @Query(() => BankAccount, { nullable: true })
  @UseMiddleware(isAuth)
  bankAccount(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<BankAccount | undefined> {
    return BankAccount.findOne({ id, creatorId: req.session.userId });
  }

  // Create New Account
  @Mutation(() => BankAccount)
  @UseMiddleware(isAuth)
  async newBankAccount(
    @Arg("input") input: BankAccountInput,
    @Ctx() { req }: MyContext
  ): Promise<BankAccount> {
    return BankAccount.create({
      ...input,
      creatorId: req.session.userId,
      currentBalance: input.startingBalance,
    }).save();
  }

  // Update Account
  @Mutation(() => BankAccount, { nullable: true })
  @UseMiddleware(isAuth)
  async updateBankAccount(
    @Arg("id", () => Int!) id: number,
    @Arg("name") name: string,
    @Arg("type") type: accountType,
    @Arg("lowBalanceAlert", () => Int) lowBalanceAlert: number,
    @Ctx() { req }: MyContext
  ): Promise<BankAccount | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(BankAccount)
      .set({ name, type, lowBalanceAlert })
      .where("id = :id and creatorId = :creatorId", {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  // Delete Account
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBankAccount(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await BankAccount.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
