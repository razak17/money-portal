import React from "react";
import { Route } from "react-router-dom";
import { Lobby } from "./pages/lobby";
import { Transactions } from "./pages/transactions";
import { Home } from "./pages/home";
import { ChakraProvider, theme } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard/lobby" component={Lobby} />
          <Route
            exact
            path="/dashboard/accounts/accounts-details/:id"
            component={Transactions}
          />
        </switch>
      </ChakraProvider>
    </>
  );
};

export default App;
