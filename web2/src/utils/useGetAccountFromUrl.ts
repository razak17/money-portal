import { useBankAccountQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetAccountFromUrl = () => {
  const intId = useGetIntId();
  return useBankAccountQuery({
    variables: {
      id: intId,
    },
  });
};
