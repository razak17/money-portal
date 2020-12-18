import { useMeQuery } from "../generated/graphql";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const history = useHistory();
  const location = useLocation();

  const location2 = {
    pathname: "/somewhere",
    state: { from: location },
  };

  console.log("Auth - loc2", location2);

  useEffect(() => {
    if (!loading && !data?.me) {
      history.push("/login?next=" + location.pathname);
    }
  }, [loading, data, history, location]);
};
