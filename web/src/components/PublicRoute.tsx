import * as React from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { AuthRoutes } from "../api/routes";
import { useMeQuery } from "../generated/graphql";

interface PublicRouteProps extends RouteProps {}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  ...rest
}) => {
  const { data, loading } = useMeQuery();

  let history = useHistory();

  React.useEffect(() => {
    if (data?.me) {
      history.push(AuthRoutes.DASHBOARD);
    }
  }, [data, history]);

  return loading ? <div>loading...</div> : <Route {...rest} />;
};
