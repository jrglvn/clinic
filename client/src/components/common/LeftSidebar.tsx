import React, { useEffect } from "react";
import * as Ui from "./styles";
import { Link, useLocation, useNavigate } from "@reach/router";

export const LeftSidebar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Ui.LeftSidebarContainer>
      <div
        is-active={location.pathname === "/appointments" ? "true" : "false"}
        onClick={() => navigate("/appointments")}
      >
        Termini
      </div>
      <div
        is-active={location.pathname === "/users" ? "true" : "false"}
        onClick={() => navigate("/users")}
      >
        Korisnici
      </div>
      <div
        is-active={location.pathname === "/clients" ? "true" : "false"}
        onClick={() => navigate("/clients")}
      >
        Klijenti
      </div>
      <div
        is-active={location.pathname === "/categories" ? "true" : "false"}
        onClick={() => navigate("/categories")}
      >
        Kategorije
      </div>
    </Ui.LeftSidebarContainer>
  );
};
