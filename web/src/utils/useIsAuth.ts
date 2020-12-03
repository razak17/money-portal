import { useMeQuery } from "../generated/graphql";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (!loading && !data?.me) {
      history.push("/login?next=" + location.pathname);
    }
  }, [loading, data, history, location]);
};
