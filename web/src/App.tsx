import React from "react";
import { Route, Switch } from "react-router-dom";
import { Lobby } from "./pages/lobby";
import { Transactions } from "./pages/transactions";
import { Home } from "./pages/home";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { NotFoundPage } from "./pages/404";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/withApollo";
// import { PrivateRoute } from "./components/PrivateRoute";
// import { PublicRoute } from "./components/PublicRoute";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard/lobby" component={Lobby} />
          <Route
            exact
            path="/dashboard/accounts/accounts-details/:id"
            component={Transactions}
          />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
