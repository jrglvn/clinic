import React, { useState } from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { Sidebar } from "./sidebar";

import * as Ui from "./styles";

const MainComponent = (props) => {
  return (
    <Ui.MainContainer>
      <Ui.HeaderContainer>{<Header /> || "HEADER FILLER"}</Ui.HeaderContainer>
      <Ui.SiderbarContainer>
        {<Sidebar /> || "SIDEBAR FILLER"}
      </Ui.SiderbarContainer>
      <Ui.ContentContainer>
        {props.children || "CONTENT FILLER"}
      </Ui.ContentContainer>
      <Ui.FooterContainer>{props.header || "FOOTER FILLER"}</Ui.FooterContainer>
    </Ui.MainContainer>
  );
};

export { MainComponent };
