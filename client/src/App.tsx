import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Router } from "@reach/router";
import { theme, GlobalStyle } from "./theme";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Clients, Home, Users } from "./components/routes";
import { MainComponent } from "./components/common/MainComponent";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MainComponent>
          <Router>
            <Home path="/" />
            <Users path="/users" />
            <Clients path="/clients" />
          </Router>
        </MainComponent>
      </ThemeProvider>
    </ApolloProvider>
  );
};
