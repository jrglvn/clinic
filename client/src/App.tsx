import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./theme";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MainComponent } from "./components";

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
        <MainComponent />
      </ThemeProvider>
    </ApolloProvider>
  );
};
