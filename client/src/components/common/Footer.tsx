import React, { useState } from "react";
import logo from "../../assets/images/mester_logo.png";
import * as Ui from "./styles";

export const Footer = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Ui.FooterContainer onClick={() => setExpanded(!expanded)}>
      <div>kontakt detalji</div>
      <Ui.FooterDetails expanded={expanded}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </Ui.FooterDetails>
    </Ui.FooterContainer>
  );
};
