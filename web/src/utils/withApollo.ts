import { ApolloClient, InMemoryCache } from "@apollo/client";

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
          bankAccounts: {
            keyArgs: [],
            merge: true,
          },
        },
      },
      Query2: {
        fields: {
          transactions: {
            keyArgs: [],
            merge: true,
          },
        },
      },
    },
  }),
});
