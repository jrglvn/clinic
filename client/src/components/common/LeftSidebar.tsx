import React, { useEffect } from "react";
import * as Ui from "./styles";
import { Link, useLocation, useNavigate } from "@reach/router";

export const LeftSidebar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Ui.LeftSidebarContainer>
      <div
        is-active={location.pathname === "/calendar" ? "true" : "false"}
        onClick={() => navigate("/calendar")}
      >
        kalendar termina
      </div>
      <div
        is-active={location.pathname === "/appointments" ? "true" : "false"}
        onClick={() => navigate("/appointments")}
      >
        svi termini
      </div>
      <div
        is-active={location.pathname === "/users" ? "true" : "false"}
        onClick={() => navigate("/users")}
      >
        doktori
      </div>
      <div
        is-active={location.pathname === "/clients" ? "true" : "false"}
        onClick={() => navigate("/clients")}
      >
        pacijenti
      </div>
      <div
        is-active={location.pathname === "/categories" ? "true" : "false"}
        onClick={() => navigate("/categories")}
      >
        kategorije
      </div>
    </Ui.LeftSidebarContainer>
  );
};
