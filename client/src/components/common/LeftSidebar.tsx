import React, { useEffect } from "react";
import * as Ui from "./styles";
import { Link, useNavigate, useLocation } from "@reach/router";

export const LeftSidebar = (props) => {
  const navigate = useNavigate();
  return (
    <Ui.LeftSidebarContainer>
      <div onClick={() => navigate("/appointments")}>Termini</div>

      <Link to="/users">
        <div>Korisnici</div>
      </Link>
      <Link to="/clients">
        <div>Klijenti</div>
      </Link>
    </Ui.LeftSidebarContainer>
  );
};
