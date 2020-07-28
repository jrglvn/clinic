import React, { useState } from "react";
import * as Ui from "../styles";
import { Users } from "./contentComponents/Users";
import { Clients } from "./contentComponents/Clients";
import { Router } from "@reach/router";
export const Content = (props) => {
  const [image, setImage] = useState<any>();
  return <Ui.Content>{props.children}</Ui.Content>;
};
