import * as React from "react";
import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { AuthRoutes } from "../api/routes";
import { useMeQuery } from "../generated/graphql";
import { LoadingSpinner } from "./partials";

interface PublicRouteProps extends RouteProps {
  Component: React.FC<any>;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  Component,
  children,
  ...rest
}) => {
  const { data, loading } = useMeQuery();

  let location: any = useLocation();
  let { from } = location.state || { from: { pathname: AuthRoutes.DASHBOARD } };

  if (loading) {
    return <LoadingSpinner />;
  }

  return data?.me ? (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: from.pathname,
            state: {
              message: "You are already logged in.",
              from: location,
            },
          }}
        />
      )}
    />
  ) : (
    <Route {...rest} component={Component} />
  );
};
