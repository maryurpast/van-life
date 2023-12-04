import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Vans
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
