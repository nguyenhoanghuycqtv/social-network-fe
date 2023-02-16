import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation";

const Root = () => {
  return (
    <main>
      <MainNavigation />
      <Outlet />
    </main>
  );
};

export default Root;
