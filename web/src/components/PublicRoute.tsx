import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const PublicRoute = ({ ...rest }) => {
  const { data, loading } = useMeQuery();
  let history = useHistory();

  useEffect(() => {
    if (loading) {
    } else if (data?.me) {
      history.push("/dashboard/lobby");
    }
    return () => {};
  }, [data?.me, history, loading]);

  return <Route {...rest} />;
};
