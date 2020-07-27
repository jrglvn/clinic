import React from "react";
import { lighten, darken } from "polished";
import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    black: "#222831",
    gray: "#393e46",
    green: "#00adb5",
    white: "#eeeeee",
  },
};

export const GlobalStyle = createGlobalStyle`
   * , ::before, ::after { 
    box-sizing: border-box;
    } 

    body,html {
      
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background: #f0f8ff;
    }
`;
