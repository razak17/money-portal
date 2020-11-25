import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  allTransactions: Array<Transaction>;
  transaction?: Maybe<Transaction>;
  bankAccounts: Array<BankAccount>;
  bankAccount?: Maybe<BankAccount>;
};


export type QueryTransactionArgs = {
  id: Scalars['Int'];
};


export type QueryBankAccountArgs = {
  id: Scalars['Int'];
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  transactionType: Scalars['String'];
  memo: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type BankAccount = {
  __typename?: 'BankAccount';
  id: Scalars['Float'];
  name: Scalars['String'];
  type: Scalars['String'];
  startingBalance: Scalars['Float'];
  lowBalanceAlert: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTransaction: Transaction;
  updateTransaction?: Maybe<Transaction>;
  deleteTransaction: Scalars['Boolean'];
  newBankAccount: BankAccount;
  updateBankAccount?: Maybe<BankAccount>;
  deleteBankAccount: Scalars['Boolean'];
};


export type MutationCreateTransactionArgs = {
  input: TransactionInput;
};


export type MutationUpdateTransactionArgs = {
  memo: Scalars['String'];
  transactionType: Scalars['String'];
  amount: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['Int'];
};


export type MutationNewBankAccountArgs = {
  input: BankAccountInput;
};


export type MutationUpdateBankAccountArgs = {
  lowBalanceAlert: Scalars['Int'];
  type: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteBankAccountArgs = {
  id: Scalars['Int'];
};

export type TransactionInput = {
  amount: Scalars['Float'];
  transactionType: Scalars['String'];
  memo: Scalars['String'];
};

export type BankAccountInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  startingBalance: Scalars['Float'];
  lowBalanceAlert: Scalars['Float'];
};

export type DeleteBankAccountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBankAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBankAccount'>
);

export type NewBankAccountMutationVariables = Exact<{
  input: BankAccountInput;
}>;


export type NewBankAccountMutation = (
  { __typename?: 'Mutation' }
  & { newBankAccount: (
    { __typename?: 'BankAccount' }
    & Pick<BankAccount, 'id' | 'name' | 'type' | 'startingBalance' | 'lowBalanceAlert' | 'createdAt'>
  ) }
);

export type UpdateBankAccountMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
  lowBalanceAlert: Scalars['Int'];
}>;


export type UpdateBankAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateBankAccount?: Maybe<(
    { __typename?: 'BankAccount' }
    & Pick<BankAccount, 'id' | 'type' | 'lowBalanceAlert' | 'createdAt' | 'updatedAt'>
  )> }
);

export type BankAccountQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BankAccountQuery = (
  { __typename?: 'Query' }
  & { bankAccount?: Maybe<(
    { __typename?: 'BankAccount' }
    & Pick<BankAccount, 'id' | 'name' | 'type' | 'startingBalance' | 'lowBalanceAlert' | 'createdAt'>
  )> }
);

export type BankAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type BankAccountsQuery = (
  { __typename?: 'Query' }
  & { bankAccounts: Array<(
    { __typename?: 'BankAccount' }
    & Pick<BankAccount, 'id' | 'name' | 'type' | 'startingBalance' | 'lowBalanceAlert' | 'createdAt'>
  )> }
);


export const DeleteBankAccountDocument = gql`
    mutation DeleteBankAccount($id: Int!) {
  deleteBankAccount(id: $id)
}
    `;
export type DeleteBankAccountMutationFn = Apollo.MutationFunction<DeleteBankAccountMutation, DeleteBankAccountMutationVariables>;

/**
 * __useDeleteBankAccountMutation__
 *
 * To run a mutation, you first call `useDeleteBankAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBankAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBankAccountMutation, { data, loading, error }] = useDeleteBankAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBankAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBankAccountMutation, DeleteBankAccountMutationVariables>) {
        return Apollo.useMutation<DeleteBankAccountMutation, DeleteBankAccountMutationVariables>(DeleteBankAccountDocument, baseOptions);
      }
export type DeleteBankAccountMutationHookResult = ReturnType<typeof useDeleteBankAccountMutation>;
export type DeleteBankAccountMutationResult = Apollo.MutationResult<DeleteBankAccountMutation>;
export type DeleteBankAccountMutationOptions = Apollo.BaseMutationOptions<DeleteBankAccountMutation, DeleteBankAccountMutationVariables>;
export const NewBankAccountDocument = gql`
    mutation NewBankAccount($input: BankAccountInput!) {
  newBankAccount(input: $input) {
    id
    name
    type
    startingBalance
    lowBalanceAlert
    createdAt
  }
}
    `;
export type NewBankAccountMutationFn = Apollo.MutationFunction<NewBankAccountMutation, NewBankAccountMutationVariables>;

/**
 * __useNewBankAccountMutation__
 *
 * To run a mutation, you first call `useNewBankAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewBankAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newBankAccountMutation, { data, loading, error }] = useNewBankAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewBankAccountMutation(baseOptions?: Apollo.MutationHookOptions<NewBankAccountMutation, NewBankAccountMutationVariables>) {
        return Apollo.useMutation<NewBankAccountMutation, NewBankAccountMutationVariables>(NewBankAccountDocument, baseOptions);
      }
export type NewBankAccountMutationHookResult = ReturnType<typeof useNewBankAccountMutation>;
export type NewBankAccountMutationResult = Apollo.MutationResult<NewBankAccountMutation>;
export type NewBankAccountMutationOptions = Apollo.BaseMutationOptions<NewBankAccountMutation, NewBankAccountMutationVariables>;
export const UpdateBankAccountDocument = gql`
    mutation UpdateBankAccount($id: Int!, $name: String!, $type: String!, $lowBalanceAlert: Int!) {
  updateBankAccount(
    id: $id
    name: $name
    type: $type
    lowBalanceAlert: $lowBalanceAlert
  ) {
    id
    type
    lowBalanceAlert
    createdAt
    updatedAt
  }
}
    `;
export type UpdateBankAccountMutationFn = Apollo.MutationFunction<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>;

/**
 * __useUpdateBankAccountMutation__
 *
 * To run a mutation, you first call `useUpdateBankAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankAccountMutation, { data, loading, error }] = useUpdateBankAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      type: // value for 'type'
 *      lowBalanceAlert: // value for 'lowBalanceAlert'
 *   },
 * });
 */
export function useUpdateBankAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>) {
        return Apollo.useMutation<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>(UpdateBankAccountDocument, baseOptions);
      }
export type UpdateBankAccountMutationHookResult = ReturnType<typeof useUpdateBankAccountMutation>;
export type UpdateBankAccountMutationResult = Apollo.MutationResult<UpdateBankAccountMutation>;
export type UpdateBankAccountMutationOptions = Apollo.BaseMutationOptions<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>;
export const BankAccountDocument = gql`
    query BankAccount($id: Int!) {
  bankAccount(id: $id) {
    id
    name
    type
    startingBalance
    lowBalanceAlert
    createdAt
  }
}
    `;

/**
 * __useBankAccountQuery__
 *
 * To run a query within a React component, call `useBankAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBankAccountQuery(baseOptions: Apollo.QueryHookOptions<BankAccountQuery, BankAccountQueryVariables>) {
        return Apollo.useQuery<BankAccountQuery, BankAccountQueryVariables>(BankAccountDocument, baseOptions);
      }
export function useBankAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BankAccountQuery, BankAccountQueryVariables>) {
          return Apollo.useLazyQuery<BankAccountQuery, BankAccountQueryVariables>(BankAccountDocument, baseOptions);
        }
export type BankAccountQueryHookResult = ReturnType<typeof useBankAccountQuery>;
export type BankAccountLazyQueryHookResult = ReturnType<typeof useBankAccountLazyQuery>;
export type BankAccountQueryResult = Apollo.QueryResult<BankAccountQuery, BankAccountQueryVariables>;
export const BankAccountsDocument = gql`
    query BankAccounts {
  bankAccounts {
    id
    name
    type
    startingBalance
    lowBalanceAlert
    createdAt
  }
}
    `;

/**
 * __useBankAccountsQuery__
 *
 * To run a query within a React component, call `useBankAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBankAccountsQuery(baseOptions?: Apollo.QueryHookOptions<BankAccountsQuery, BankAccountsQueryVariables>) {
        return Apollo.useQuery<BankAccountsQuery, BankAccountsQueryVariables>(BankAccountsDocument, baseOptions);
      }
export function useBankAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BankAccountsQuery, BankAccountsQueryVariables>) {
          return Apollo.useLazyQuery<BankAccountsQuery, BankAccountsQueryVariables>(BankAccountsDocument, baseOptions);
        }
export type BankAccountsQueryHookResult = ReturnType<typeof useBankAccountsQuery>;
export type BankAccountsLazyQueryHookResult = ReturnType<typeof useBankAccountsLazyQuery>;
export type BankAccountsQueryResult = Apollo.QueryResult<BankAccountsQuery, BankAccountsQueryVariables>;