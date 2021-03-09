import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { TransactionCategory } from "../entities/TransactionCategory";

@Resolver(TransactionCategory)
export class TransactionCategoryResolver {
  @Mutation(() => String)
  async hello(@Arg("name", () => String) name: string): Promise<string> {
    return name;
  }

  @Query(() => String)
  async hi(): Promise<string> {
    return "hi";
  }
}
