import React, { useEffect } from "react";
import * as Ui from "./styles";
import { Link } from "@reach/router";

export const Sidebar = (props) => {
  return (
    <Ui.SiderbarContainer>
      <Link to="/users">Korisnici aplikacije</Link>
    </Ui.SiderbarContainer>
  );
};
