// import { withApollo as createWithApollo } from "next-apollo";
import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  PaginatedBankAccounts,
  PaginatedTransactions,
} from "../generated/graphql";
import { NextPageContext } from 'next';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
       typePolicies: {
          Query: {
            fields: {
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
              // transactions: {
                // keyArgs: [],
                // merge(
                  // _: PaginatedTransactions | undefined,
                  // incoming: PaginatedTransactions
                // ): PaginatedTransactions {
                  // const merged = {
                    // ...incoming,
                    // transactions: [...incoming.transactions],
                  // };
                  // return merged;
                // },
              // },
            },
          },
        },
    }),
  });

export const withApollo = createWithApollo(createClient);
