import { useBankAccountQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetransactionFromUrl = () => {
  const intId = useGetIntId();
  return useBankAccountQuery({
    variables: {
      id: intId,
    },
  });
};
