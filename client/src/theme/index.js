import React from "react";
import { lighten, darken } from "polished";
import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    color1: "#222831", //black
    color2: "#393e46", //gray
    color3: "#00adb5", //green
    color4: "#eeeeee", //white
    color5: "#3f72af", //blueish
    color6: "#e23e57", //redish
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
    background: steelblue ;
    }
    a {
      color: inherit; 
       text-decoration: inherit;
}
`;
