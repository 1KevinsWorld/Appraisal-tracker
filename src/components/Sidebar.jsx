import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Sidebar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Sidebar;
