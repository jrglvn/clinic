import React, { useState } from "react";

import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { Footer } from "./Footer";
import { RightSidebar } from "./RightSidebar";

import * as Ui from "./styles";

export const MainComponent = (props) => {
  return (
    <Ui.MainContainer>
      <Header />
      <LeftSidebar />
      {props.children}
      <RightSidebar />
      <Footer />
    </Ui.MainContainer>
  );
};
