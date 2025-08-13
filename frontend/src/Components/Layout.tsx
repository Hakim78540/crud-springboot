import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { isAuth } from "../Services/auth";
import ThemeToggle from "./ThemeToggle";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const authed = isAuth() && pathname !== "/";

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to={authed ? "/persons" : "/"}>PeopleApp</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav me-auto">
              {authed && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/persons"><i className="bi bi-people me-1" />Liste</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/persons/new"><i className="bi bi-plus-lg me-1" />Ajouter</Link>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex gap-2">
            <ThemeToggle />
            {authed && <LogoutButton />}
            </div>
          </div>
        </div>
      </nav>

      <main className="container my-4">{children}</main>
    </>
  );
};

export default Layout;
