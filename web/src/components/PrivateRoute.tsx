import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const { data, loading } = useMeQuery();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !loading && !!data?.me ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
