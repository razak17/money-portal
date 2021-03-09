import {
  Arg,
  Mutation,
  Resolver,
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
import { BankAccountOptions } from "../types";
import { BankAccountInput } from "./BankAccountInput";
import { validateNew } from "../utils/validateBankAccount";
import { updateBankAccountController } from "../controllers/updateBankAccountController"

@ObjectType()
class BankAccountError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class BankAccountResponse {
  @Field(() => [BankAccountError], { nullable: true })
  errors?: BankAccountError[];

  @Field(() => BankAccount, { nullable: true })
  bankAccount?: BankAccount | null;
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

  // Total BankAccounts
  @Query(() => Number)
  @UseMiddleware(isAuth)
  async totalBankAccounts(@Ctx() { req }: MyContext): Promise<number> {
    const { userId } = req.session;
    const bankAccounts = await BankAccount.find({ creatorId: userId });
    return bankAccounts.length;
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

    const realLimit = Math.min(500, limit);
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
        ? `where b."creatorId" = $2 and b."createdAt" < $3`
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
    const { userId } = req.session;
    return BankAccount.findOne({ id, creatorId: userId });
  }

  // Create New Account
  @Mutation(() => BankAccountResponse)
  @UseMiddleware(isAuth)
  async newBankAccount(
    @Arg("input") input: BankAccountInput,
    @Ctx() { req }: MyContext
  ): Promise<BankAccountResponse> {
    const { userId } = req.session;
    const errors = validateNew(input);
    if (errors) {
      return { errors };
    }

    const bankAccount = await BankAccount.create({
      ...input,
      creatorId: userId,
      currentBalance: input.startingBalance,
    }).save();

    return { bankAccount };
  }

  // Update Account
  @Mutation(() => BankAccountResponse)
  @UseMiddleware(isAuth)
  async updateBankAccount(
    @Arg("id", () => Int!) id: number,
    @Arg("name") name: string,
    @Arg("type") type: BankAccountOptions,
    @Arg("lowBalanceAlert") lowBalanceAlert: number,
    @Ctx() { req }: MyContext
  ): Promise<BankAccountResponse> {
    const { userId } = req.session;

    const bankAccount = updateBankAccountController(
      id,
      name,
      type,
      lowBalanceAlert,
      userId
    );

    return bankAccount;
  }

  // Delete Account
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBankAccount(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { userId } = req.session;
    await BankAccount.delete({ id, creatorId: userId });
    return true;
  }
}
