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
  totalTransactions: Scalars['Float'];
  transactions: PaginatedTransactions;
  transaction?: Maybe<Transaction>;
  totalBankAccounts: Scalars['Float'];
  bankAccounts: PaginatedBankAccounts;
  bankAccount?: Maybe<BankAccount>;
  me?: Maybe<User>;
};


export type QueryTotalTransactionsArgs = {
  bankAccountId: Scalars['Int'];
};


export type QueryTransactionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
  bankAccountId: Scalars['Int'];
};


export type QueryTransactionArgs = {
  bankAccountId: Scalars['Int'];
  id: Scalars['Int'];
};


export type QueryBankAccountsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryBankAccountArgs = {
  id: Scalars['Int'];
};

export type PaginatedTransactions = {
  __typename?: 'PaginatedTransactions';
  transactions: Array<Transaction>;
  hasMore: Scalars['Boolean'];
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  type: Scalars['String'];
  memo: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  bankAccountId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  bankAccount: BankAccount;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
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
  currentBalance: Scalars['Float'];
  monthlySpending: Scalars['Float'];
  monthlyDeposits: Scalars['Float'];
  monthlyTransactions: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedBankAccounts = {
  __typename?: 'PaginatedBankAccounts';
  bankAccounts: Array<BankAccount>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newTransaction: Transaction;
  updateTransaction?: Maybe<Transaction>;
  deleteTransaction: Scalars['Boolean'];
  newBankAccount: BankAccount;
  updateBankAccount?: Maybe<BankAccount>;
  deleteBankAccount: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationNewTransactionArgs = {
  bankAccountId: Scalars['Int'];
  input: TransactionInput;
};


export type MutationUpdateTransactionArgs = {
  memo: Scalars['String'];
  type: Scalars['String'];
  amount: Scalars['Float'];
  bankAccountId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationDeleteTransactionArgs = {
  bankAccountId: Scalars['Int'];
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


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type TransactionInput = {
  amount: Scalars['Float'];
  type: Scalars['String'];
  memo: Scalars['String'];
};

export type BankAccountInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  startingBalance: Scalars['Float'];
  lowBalanceAlert: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeleteBankAccountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBankAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBankAccount'>
);

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
  bankAccountId: Scalars['Int'];
}>;


export type DeleteTransactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTransaction'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
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

export type NewTransactionMutationVariables = Exact<{
  input: TransactionInput;
  bankAccountId: Scalars['Int'];
}>;


export type NewTransactionMutation = (
  { __typename?: 'Mutation' }
  & { newTransaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'amount' | 'type' | 'memo' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    ), bankAccount: (
      { __typename?: 'BankAccount' }
      & Pick<BankAccount, 'id' | 'name' | 'type'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt'>
    )> }
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

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
  bankAccountId: Scalars['Int'];
  amount: Scalars['Float'];
  memo: Scalars['String'];
  type: Scalars['String'];
}>;


export type UpdateTransactionMutation = (
  { __typename?: 'Mutation' }
  & { updateTransaction?: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'type' | 'memo' | 'createdAt' | 'updatedAt'>
  )> }
);

export type BankAccountQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BankAccountQuery = (
  { __typename?: 'Query' }
  & { bankAccount?: Maybe<(
    { __typename?: 'BankAccount' }
    & Pick<BankAccount, 'id' | 'name' | 'type' | 'startingBalance' | 'lowBalanceAlert' | 'currentBalance' | 'monthlySpending' | 'monthlyTransactions' | 'monthlyDeposits' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    ) }
  )> }
);

export type BankAccountsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type BankAccountsQuery = (
  { __typename?: 'Query' }
  & { bankAccounts: (
    { __typename?: 'PaginatedBankAccounts' }
    & Pick<PaginatedBankAccounts, 'hasMore'>
    & { bankAccounts: Array<(
      { __typename?: 'BankAccount' }
      & Pick<BankAccount, 'id' | 'name' | 'type' | 'startingBalance' | 'lowBalanceAlert' | 'currentBalance' | 'monthlySpending' | 'monthlyTransactions' | 'monthlyDeposits' | 'createdAt' | 'updatedAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'email'>
      ) }
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);

export type TotalBankAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalBankAccountsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'totalBankAccounts'>
);

export type TotalTransactionsQueryVariables = Exact<{
  bankAccountId: Scalars['Int'];
}>;


export type TotalTransactionsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'totalTransactions'>
);

export type TransactionQueryVariables = Exact<{
  bankAccountId: Scalars['Int'];
  id: Scalars['Int'];
}>;


export type TransactionQuery = (
  { __typename?: 'Query' }
  & { transaction?: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'amount' | 'type' | 'memo'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), bankAccount: (
      { __typename?: 'BankAccount' }
      & Pick<BankAccount, 'id' | 'name' | 'type'>
    ) }
  )> }
);

export type TransactionsQueryVariables = Exact<{
  bankAccountId: Scalars['Int'];
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: (
    { __typename?: 'PaginatedTransactions' }
    & Pick<PaginatedTransactions, 'hasMore'>
    & { transactions: Array<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'amount' | 'type' | 'memo' | 'createdAt' | 'updatedAt'>
      & { bankAccount: (
        { __typename?: 'BankAccount' }
        & Pick<BankAccount, 'id' | 'name' | 'type'>
      ), creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
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
export const DeleteTransactionDocument = gql`
    mutation DeleteTransaction($id: Int!, $bankAccountId: Int!) {
  deleteTransaction(id: $id, bankAccountId: $bankAccountId)
}
    `;
export type DeleteTransactionMutationFn = Apollo.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      bankAccountId: // value for 'bankAccountId'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        return Apollo.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, baseOptions);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = Apollo.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const NewTransactionDocument = gql`
    mutation NewTransaction($input: TransactionInput!, $bankAccountId: Int!) {
  newTransaction(input: $input, bankAccountId: $bankAccountId) {
    id
    amount
    type
    memo
    creator {
      id
      username
      email
    }
    bankAccount {
      id
      name
      type
    }
    createdAt
  }
}
    `;
export type NewTransactionMutationFn = Apollo.MutationFunction<NewTransactionMutation, NewTransactionMutationVariables>;

/**
 * __useNewTransactionMutation__
 *
 * To run a mutation, you first call `useNewTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTransactionMutation, { data, loading, error }] = useNewTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *      bankAccountId: // value for 'bankAccountId'
 *   },
 * });
 */
export function useNewTransactionMutation(baseOptions?: Apollo.MutationHookOptions<NewTransactionMutation, NewTransactionMutationVariables>) {
        return Apollo.useMutation<NewTransactionMutation, NewTransactionMutationVariables>(NewTransactionDocument, baseOptions);
      }
export type NewTransactionMutationHookResult = ReturnType<typeof useNewTransactionMutation>;
export type NewTransactionMutationResult = Apollo.MutationResult<NewTransactionMutation>;
export type NewTransactionMutationOptions = Apollo.BaseMutationOptions<NewTransactionMutation, NewTransactionMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export const UpdateTransactionDocument = gql`
    mutation UpdateTransaction($id: Int!, $bankAccountId: Int!, $amount: Float!, $memo: String!, $type: String!) {
  updateTransaction(
    id: $id
    bankAccountId: $bankAccountId
    amount: $amount
    type: $type
    memo: $memo
  ) {
    id
    type
    memo
    createdAt
    updatedAt
  }
}
    `;
export type UpdateTransactionMutationFn = Apollo.MutationFunction<UpdateTransactionMutation, UpdateTransactionMutationVariables>;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionMutation, { data, loading, error }] = useUpdateTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      bankAccountId: // value for 'bankAccountId'
 *      amount: // value for 'amount'
 *      memo: // value for 'memo'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUpdateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>) {
        return Apollo.useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(UpdateTransactionDocument, baseOptions);
      }
export type UpdateTransactionMutationHookResult = ReturnType<typeof useUpdateTransactionMutation>;
export type UpdateTransactionMutationResult = Apollo.MutationResult<UpdateTransactionMutation>;
export type UpdateTransactionMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const BankAccountDocument = gql`
    query BankAccount($id: Int!) {
  bankAccount(id: $id) {
    id
    name
    type
    startingBalance
    lowBalanceAlert
    currentBalance
    monthlySpending
    monthlyTransactions
    monthlyDeposits
    creator {
      id
      username
      email
    }
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
    query BankAccounts($limit: Int!, $cursor: String) {
  bankAccounts(limit: $limit, cursor: $cursor) {
    hasMore
    bankAccounts {
      id
      name
      type
      startingBalance
      lowBalanceAlert
      currentBalance
      monthlySpending
      monthlyTransactions
      monthlyDeposits
      creator {
        id
        username
        email
      }
      createdAt
      updatedAt
    }
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
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useBankAccountsQuery(baseOptions: Apollo.QueryHookOptions<BankAccountsQuery, BankAccountsQueryVariables>) {
        return Apollo.useQuery<BankAccountsQuery, BankAccountsQueryVariables>(BankAccountsDocument, baseOptions);
      }
export function useBankAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BankAccountsQuery, BankAccountsQueryVariables>) {
          return Apollo.useLazyQuery<BankAccountsQuery, BankAccountsQueryVariables>(BankAccountsDocument, baseOptions);
        }
export type BankAccountsQueryHookResult = ReturnType<typeof useBankAccountsQuery>;
export type BankAccountsLazyQueryHookResult = ReturnType<typeof useBankAccountsLazyQuery>;
export type BankAccountsQueryResult = Apollo.QueryResult<BankAccountsQuery, BankAccountsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TotalBankAccountsDocument = gql`
    query TotalBankAccounts {
  totalBankAccounts
}
    `;

/**
 * __useTotalBankAccountsQuery__
 *
 * To run a query within a React component, call `useTotalBankAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalBankAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalBankAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTotalBankAccountsQuery(baseOptions?: Apollo.QueryHookOptions<TotalBankAccountsQuery, TotalBankAccountsQueryVariables>) {
        return Apollo.useQuery<TotalBankAccountsQuery, TotalBankAccountsQueryVariables>(TotalBankAccountsDocument, baseOptions);
      }
export function useTotalBankAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalBankAccountsQuery, TotalBankAccountsQueryVariables>) {
          return Apollo.useLazyQuery<TotalBankAccountsQuery, TotalBankAccountsQueryVariables>(TotalBankAccountsDocument, baseOptions);
        }
export type TotalBankAccountsQueryHookResult = ReturnType<typeof useTotalBankAccountsQuery>;
export type TotalBankAccountsLazyQueryHookResult = ReturnType<typeof useTotalBankAccountsLazyQuery>;
export type TotalBankAccountsQueryResult = Apollo.QueryResult<TotalBankAccountsQuery, TotalBankAccountsQueryVariables>;
export const TotalTransactionsDocument = gql`
    query TotalTransactions($bankAccountId: Int!) {
  totalTransactions(bankAccountId: $bankAccountId)
}
    `;

/**
 * __useTotalTransactionsQuery__
 *
 * To run a query within a React component, call `useTotalTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalTransactionsQuery({
 *   variables: {
 *      bankAccountId: // value for 'bankAccountId'
 *   },
 * });
 */
export function useTotalTransactionsQuery(baseOptions: Apollo.QueryHookOptions<TotalTransactionsQuery, TotalTransactionsQueryVariables>) {
        return Apollo.useQuery<TotalTransactionsQuery, TotalTransactionsQueryVariables>(TotalTransactionsDocument, baseOptions);
      }
export function useTotalTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalTransactionsQuery, TotalTransactionsQueryVariables>) {
          return Apollo.useLazyQuery<TotalTransactionsQuery, TotalTransactionsQueryVariables>(TotalTransactionsDocument, baseOptions);
        }
export type TotalTransactionsQueryHookResult = ReturnType<typeof useTotalTransactionsQuery>;
export type TotalTransactionsLazyQueryHookResult = ReturnType<typeof useTotalTransactionsLazyQuery>;
export type TotalTransactionsQueryResult = Apollo.QueryResult<TotalTransactionsQuery, TotalTransactionsQueryVariables>;
export const TransactionDocument = gql`
    query Transaction($bankAccountId: Int!, $id: Int!) {
  transaction(bankAccountId: $bankAccountId, id: $id) {
    id
    amount
    type
    memo
    creator {
      id
      username
    }
    bankAccount {
      id
      name
      type
    }
  }
}
    `;

/**
 * __useTransactionQuery__
 *
 * To run a query within a React component, call `useTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionQuery({
 *   variables: {
 *      bankAccountId: // value for 'bankAccountId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTransactionQuery(baseOptions: Apollo.QueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
        return Apollo.useQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, baseOptions);
      }
export function useTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
          return Apollo.useLazyQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, baseOptions);
        }
export type TransactionQueryHookResult = ReturnType<typeof useTransactionQuery>;
export type TransactionLazyQueryHookResult = ReturnType<typeof useTransactionLazyQuery>;
export type TransactionQueryResult = Apollo.QueryResult<TransactionQuery, TransactionQueryVariables>;
export const TransactionsDocument = gql`
    query Transactions($bankAccountId: Int!, $limit: Int!, $offset: Int) {
  transactions(bankAccountId: $bankAccountId, limit: $limit, offset: $offset) {
    hasMore
    transactions {
      id
      amount
      type
      memo
      bankAccount {
        id
        name
        type
      }
      creator {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      bankAccountId: // value for 'bankAccountId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;