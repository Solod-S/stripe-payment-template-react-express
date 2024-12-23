import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const SharedLayout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
