// const moreData = (n: number) => {
// const res = fetchMore({
// variables: {
// limit: variables?.limit,
// offset: n,
// },
// });
// return res;
// };

// const filterRefetch = (customFilter: string) => {
// const res = refetch({
// bankAccountId: intId,
// limit,
// offset: page,
// filter: customFilter,
// });
// console.log("RES", res);
// return res;
// };

          // const newTodoFromResponse = data?.newTransaction.transaction;

          // const getTransactions = cache.readQuery<TransactionsQuery>({
            // query: TransactionsDocument,
            // variables: {
              // bankAccountId: intId,
              // limit: LIMIT,
              // offset: PAGE
            // },
          // });

          // const existing = getTransactions ? getTransactions : [];

          // if(newTodoFromResponse) {
            // const Tdata = cache.readFragment<{
              // id: number;
              // amount: number;
              // memo: string;
            // }>({
              // id: "Transaction:" + newTodoFromResponse.id,
              // fragment: gql`
              // fragment _ on Transaction {
                // id
                // amount
                // memo
              // }
            // `,
          // })
          // cache.writeFragment({
            // id: "Transaction:" + newTodoFromResponse.id,
            // fragment: gql`
              // fragment __ on Transaction {
                // amount
                // memo
              // }
            // `,
            // data: { amount: 17, memo: "heres me" },
          // });
          // console.log('Tdata', Tdata);
          // }
          // console.log('newTodoFromResponse', newTodoFromResponse);
          // console.log('getTransactions', existing);

  // const searchRefetch = (query: string) => {
    // const res = refetch({
      // bankAccountId: intId,
      // limit,
      // offset: PAGE,
      // filter,
      // search: query
    // });
    // console.log("SEARCH", res);
    // return res;
  // };


  // const filterRefetch = (customFilter: string) => {
    // const res = refetch({
      // bankAccountId: intId,
      // limit,
      // offset: PAGE,
      // filter: customFilter,
    // });
    // return res;
  // };


export const withdrawalOptions = [
  "cash withdrawal",
  "card number entered",
  "check",
  "point of sale",
];
