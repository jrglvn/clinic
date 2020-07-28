import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Router } from "@reach/router";
import { theme, GlobalStyle } from "./theme";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MainComponent } from "./components";
import { Header } from "./components/common/Header";
import { Sidebar } from "./components/common/Sidebar";
import { Content } from "./components/common/Content";
import { Clients } from "./components/common/contentComponents/Clients";
import { Users } from "./components/common/contentComponents/Users";

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
        <Router>
          <MainComponent path="/">
            <Header />
            <Sidebar />
            <Content>
              <Users path="users" />
              <Clients path="clients" />
            </Content>
          </MainComponent>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};
