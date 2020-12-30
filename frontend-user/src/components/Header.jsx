import React from "react";
import {useLocation} from "react-router-dom";

import NavBar from "./Navbar/NavBar";

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
    {isNavbar ? <NavBar/> : null}
  </React.Fragment>
)};

export default Header;
