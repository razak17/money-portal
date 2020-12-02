import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  PaginatedTransactions,
  PaginatedBankAccounts,
} from "../generated/graphql";

export const createClient = (ctx: any) => {
  new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache(),
  });
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          transactions: {
            keyArgs: [],
            merge(
              existing: PaginatedTransactions | undefined,
              incoming: PaginatedTransactions
            ): PaginatedTransactions {
              return {
                ...incoming,
                transactions: [
                  ...(existing?.transactions || []),
                  ...incoming.transactions,
                ],
              };
            },
          },
          bankAccounts: {
            keyArgs: [],
            merge(
              existing: PaginatedBankAccounts | undefined,
              incoming: PaginatedBankAccounts
            ): PaginatedBankAccounts {
              return {
                ...incoming,
                bankAccounts: [
                  ...(existing?.bankAccounts || []),
                  ...incoming.bankAccounts,
                ],
              };
            },
          },
        },
      },
    },
  }),
});
