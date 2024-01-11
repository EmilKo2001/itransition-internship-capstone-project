import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../context/Context";

import Container from "../Container";

export default function Header() {
  const { token, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="fixed z-10 w-full shadow">
      <Container>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost  p-0 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <Link to="/" className="btn btn-ghost ml-4 p-0 text-xl lg:ml-0">
                LOGO
              </Link>
              <ul
                tabIndex={0}
                className="menu-sm dropdown-content menu rounded-box z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li className="">
                  <Link className="link" to="/">
                    HOME
                  </Link>
                </li>

                {token ? (
                  <>
                    <li className="">
                      <Link className="link" to="/admin">
                        ADMIN
                      </Link>
                    </li>
                    <li className="link" onClick={handleLogout}>
                      LOGOUT
                    </li>
                  </>
                ) : (
                  <>
                    <li className="">
                      <Link className="link" to="/login">
                        LOGIN
                      </Link>
                    </li>
                    <li className="">
                      <Link className="link" to="/register">
                        REGISTER
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li className="">
                <Link className="link" to="/">
                  HOME
                </Link>
              </li>

              {token ? (
                <>
                  <li className="">
                    <Link className="link" to="/admin">
                      ADMIN
                    </Link>
                  </li>
                  <li className="link" onClick={handleLogout}>
                    <Link className="link" to="#">
                      LOGOUT
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="">
                    <Link className="link" to="/login">
                      LOGIN
                    </Link>
                  </li>
                  <li className="">
                    <Link className="link" to="/register">
                      REGISTER
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="navbar-end">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onClick={toggleTheme} />

              {/* sun icon */}
              <svg
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </Container>
    </header>
  );
}
