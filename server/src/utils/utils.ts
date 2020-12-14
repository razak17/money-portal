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

export const withdrawalOptions = [
  "cash withdrawal",
  "card number entered",
  "check",
  "point of sale",
];
