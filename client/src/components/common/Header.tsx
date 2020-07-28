import React, { useState } from "react";
import logo from "../../assets/images/mester_logo.png";
import * as Ui from "../styles";

export const Header = (props) => {
  return (
    <Ui.HeaderContainer>
      <Ui.Header>
        <img src={logo} alt="logo" height="80px" />
      </Ui.Header>
    </Ui.HeaderContainer>
  );
};
