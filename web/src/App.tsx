import React from "react";
import { Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./pages/home";
import { Lobby } from "./pages/lobby";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Admin } from "./pages/admin";
import { NotFoundPage } from "./pages/404";
import { Transactions } from "./pages/transactions";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { AuthRoutes, NonAuthRoutes } from "./api/routes";
import overrides from "./theme";

const App = () => {
  return (
    <ChakraProvider theme={overrides}>
      <Switch>
        <Route exact path={NonAuthRoutes.HOME} component={Home} />
        <Route exact path="/admin" component={Admin} />
        <PublicRoute exact path={NonAuthRoutes.LOGIN} component={Login} />
        <Route exact path={NonAuthRoutes.REGISTER} component={Register} />
        <PrivateRoute exact path={AuthRoutes.DASHBOARD}>
          <Lobby />
        </PrivateRoute>
        <PrivateRoute exact path={AuthRoutes.TRANSACTIONS}>
          <Transactions />
        </PrivateRoute>
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    </ChakraProvider>
  );
};

export default App;
