import React, { useState } from "react";
import { Header } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { Footer } from "./Footer";

import * as Ui from "./styles";

export const MainComponent = (props) => {
  return (
    <Ui.MainContainer>
      <Header />
      <LeftSidebar />
      <Ui.ContentContainer>{props.children}</Ui.ContentContainer>
      <Footer />
    </Ui.MainContainer>
  );
};
