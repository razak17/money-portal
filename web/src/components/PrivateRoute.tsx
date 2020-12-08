import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { NonAuthRoutes } from "../api/routes";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <div>please wait...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        data?.me ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: NonAuthRoutes.LOGIN,
              state: {
                message: "Please log in to view this page",
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};
