import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [toggle, setToggle] = React.useState(false);
  //   const [open, setOpen] = React.useState(false);
  let burgerRef = React.useRef();

  React.useEffect(() => {
    let handler = (e) => {
      if (!burgerRef.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handler);
    return () => document.addEventListener("click", handler);
  }, []);

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #Vanlife
      </Link>
      <nav className={toggle ? "active header-nav" : "header-nav"}>
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

        <Link to="login" className="nav-link log-in">
          Log in
        </Link>

        <button className="nav-link close-btn" onClick={fakeLogOut}>
          Exit
        </button>
      </nav>
      <div
        ref={burgerRef}
        className={toggle ? "hamburger active" : "hamburger"}
        onClick={() => setToggle((prev) => !prev)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}
