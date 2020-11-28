import React from "react";
import { Route, Switch } from "react-router-dom";
import { Lobby } from "./pages/lobby";
import { Transactions } from "./pages/transactions";
import { Home } from "./pages/home";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard/lobby">
          <Lobby />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/accounts/accounts-details/:id">
          <Transactions />
        </PrivateRoute>
      </Switch>
    </ChakraProvider>
  );
};

export default App;
