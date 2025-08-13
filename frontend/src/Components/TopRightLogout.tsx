import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { isAuth } from "../Services/auth";

const TopRightLogout: React.FC = () => {
  const { pathname } = useLocation();

  // On cache sur la page de login et si pas authentifié
  if (!isAuth() || pathname === "/") return null;

  return (
    <div className="top-right-logout">
      <LogoutButton />
    </div>
  );
};

export default TopRightLogout;
