import React, { useState } from "react";
import logo from "../../assets/images/mester_logo.png";
import * as Ui from "./styles";

export const Header = (props) => {
  return (
    <Ui.HeaderContainer>
      {/* <Ui.Header>
        <img src={logo} alt="logo" style={{ height: "64px" }} />
      </Ui.Header> */}
      <h2
        style={{
          fontFamily: "times-new-roman",
          textAlign: "center",
          margin: 0,
          padding: 0,
        }}
      >
        KLINIKA
      </h2>
    </Ui.HeaderContainer>
  );
};
