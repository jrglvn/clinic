import React from "react";
import { lighten, darken } from "polished";
import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    bs_primary: "#0275d8", //blueish
    bs_danger: "#df4759", //bootstrap danger red
    bs_new: "#5cb85c", //bootstrap green
    bs_warning: "#f0ad4e", // orange
    bs_info: "#5bc0de",
    bs_inverse: "#292b2c",
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
    opacity:.8;
    box-shadow:0 0 4px 0 #ccc;
  }

  textarea, input, select {   
    outline: none; 
    padding:.5rem;
  border: light solid black;
  }

label {
  color:gray;
  font-style:italic;
}

svg:hover{
opacity:.8;
transform:scale(1.05);
}

transition:.2;

input:focus, select:focus{
  outline: medium solid rgba(240,173,78,.5);
}

`;
