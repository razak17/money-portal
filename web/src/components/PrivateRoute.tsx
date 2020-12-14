import * as React from "react";
import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { NonAuthRoutes } from "../api/routes";
import { LoadingSpinner } from "./partials";

interface PrivateRouteProps extends RouteProps {
  Component: React.FC<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  children,
  Component,
  ...rest
}) => {
  const { data, loading } = useMeQuery();

  let location: any = useLocation();
  let { from } = location.state || { from: { pathname: NonAuthRoutes.LOGIN } };

  if (loading) {
    return <LoadingSpinner />;
  }

  return data?.me ? (
    <Route {...rest} component={Component} />
  ) : (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: from.pathname,
            state: {
              message: "Please log in to view this page",
              from: location,
            },
          }}
        />
      )}
    />
  );
};
