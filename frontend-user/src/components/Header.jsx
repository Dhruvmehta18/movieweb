import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar/Navbar";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const noHeaderPathList = [
    '/search',
    '/play'
  ];
  const isNavbar = !noHeaderPathList.includes((pathname));
  return (
  <React.Fragment>
    {isNavbar?<Navbar />: null}
  </React.Fragment>
)};

export default Header;
