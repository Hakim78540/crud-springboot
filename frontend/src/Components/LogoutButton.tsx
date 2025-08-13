import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Services/auth";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    logout();
    navigate("/", { replace: true });
  };
  return (
    <button onClick={onClick} className="btn btn-outline-secondary">
  <i className="bi bi-box-arrow-right me-1" /> Se déconnecter
</button>

  );
};

export default LogoutButton;
