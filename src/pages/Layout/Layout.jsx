import React from "react";
import { Outlet, useParams } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="header">header</div>
      <Outlet />
      <div className="footer">footer</div>
    </div>
  );
};

export default Layout;
