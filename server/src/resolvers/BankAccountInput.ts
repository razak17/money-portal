import { InputType, Field } from "type-graphql";
import { BankAccountOptions } from "../types";

@InputType()
export class BankAccountInput {
  @Field()
  name: string;
  @Field()
  type: BankAccountOptions;
  @Field()
  startingBalance: number;
  @Field()
  lowBalanceAlert: number;
}
