import React, { useState } from "react";

import * as Ui from "./styles";

export const MainComponent = (props) => {
  return <Ui.MainContainer>{props.children}</Ui.MainContainer>;
};
