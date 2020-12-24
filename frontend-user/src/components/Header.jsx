import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar/Navbar";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname)
  return (
  <React.Fragment>
    {pathname!=="/search"?<Navbar />: null}
  </React.Fragment>
)};

export default Header;
