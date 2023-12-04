import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        #Vanlife
      </Link>
      <nav>
        <NavLink
          to="host"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Vans
        </NavLink>
      </nav>
    </header>
  );
}
