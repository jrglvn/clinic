import React, { useEffect } from "react";
import * as Ui from "./styles";
import { Link } from "@reach/router";

export const Sidebar = (props) => {
  return (
    <Ui.SidebarContainer>
      <Link to="/users">
        <div>Korisnici</div>
      </Link>
      <Link to="/clients">
        <div>Klijenti</div>
      </Link>
    </Ui.SidebarContainer>
  );
};
