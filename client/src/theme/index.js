import React from "react";
import { lighten, darken } from "polished";
import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#3f72af", //blueish
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
    background: #3f72af ;
    }
    a {
      color: inherit; 
      text-decoration: inherit;
    }

  button {
    padding:.5rem;
    border-radius:4px;
    outline:none;
    border:0;
    cursor:pointer;
    background: #aaa;
    color:white;
  }
  button:hover {
    background-color: #bbb;
    box-shadow:0 0 4px 0 #ccc;
  }

  textarea, input, select {   
    outline: none; 
    padding:.5rem;
  }

label {
  color:gray;
  font-style:italic;
}



`;
