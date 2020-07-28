import React, { useState } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

import * as Ui from "./styles";

export const MainComponent = (props) => {
  return (
    <Ui.MainContainer>
      <Header />
      <Sidebar />
      {props.children}
      <Footer />
    </Ui.MainContainer>
  );
};
