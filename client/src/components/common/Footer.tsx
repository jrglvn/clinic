import React, { useState } from "react";
import logo from "../../assets/images/mester_logo.png";
import * as Ui from "./styles";

export const Footer = (props) => {
  return (
    <Ui.FooterContainer>
      <Ui.Header>
        <img src={logo} alt="logo" height="80px" />
      </Ui.Header>
    </Ui.FooterContainer>
  );
};
