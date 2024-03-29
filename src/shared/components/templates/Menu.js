import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../app/store/auth-slice";

const Menu = () => {
  const [userId, setUser] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  useEffect(() => {
    if (localStorage.getItem("userData") !== null && isLoggedIn) {
      const { userId } = JSON.parse(localStorage.getItem("userData"));
      setUser(userId);
    }
  }, [isLoggedIn]);
  return (
    <ul className="menu w-1/5 p-2 rounded-box fixed left-0">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "active" : "";
          }}
        >
          <svg
            className="w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="font-extrabold text-xl">Home</span>
        </NavLink>
      </li>
      {!isLoggedIn && (
        <li>
          <NavLink
            to="/auth"
            className={({ isActive }) => {
              return isActive ? "active" : "";
            }}
          >
            <svg
              className="w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
            <span className="font-extrabold text-xl">Login</span>
          </NavLink>
        </li>
      )}
      {isLoggedIn && userId && (
        <React.Fragment>
          <li>
            <NavLink
              to={`/users/${userId}`}
              className={({ isActive }) => {
                return isActive ? "active" : "";
              }}
            >
              <svg
                className="w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-extrabold text-xl">Me</span>
            </NavLink>
          </li>
          <li>
            <button onClick={logoutHandler}>
              <svg
                className="w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-extrabold text-xl">Logout</span>
            </button>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default Menu;
