import React from "react";
import MyNavbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <MyNavbar />
      {children}
    </>
  );
};

export default MainLayout;
