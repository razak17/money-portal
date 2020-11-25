import React from "react";
import { Route, Switch } from "react-router-dom";
import { Lobby } from "./pages/lobby";
import { Transactions } from "./pages/transactions";
import { Home } from "./pages/home";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard/lobby" component={Lobby} />
          <Route
            exact
            path="/dashboard/accounts/accounts-details/:id"
            component={Transactions}
          />
        </Switch>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
