import React, { useState } from "react";
import logo from "../../assets/images/mester_logo.png";
import * as Ui from "./styles";

export const Footer = (props) => {
  return (
    <Ui.FooterContainer>
      {/* <Ui.Header>footer</Ui.Header> */}
      <h3
        style={{
          fontFamily: "times-new-roman",
          textAlign: "center",
          borderTop: "1px solid gray",
          padding: ".25rem",
          margin: 0,
          marginTop: ".25rem",
        }}
      >
        footer
      </h3>
    </Ui.FooterContainer>
  );
};
