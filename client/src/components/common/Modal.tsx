import React from "react";
import { createPortal } from "react-dom";

import * as Ui from "./styles";

export const Modal = (props) => {
  return createPortal(<Ui.Modal>test</Ui.Modal>, document.body);
};
