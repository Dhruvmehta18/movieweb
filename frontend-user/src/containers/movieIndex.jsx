import { Box } from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import useAuth from "../components/useAuth";

const MovieIndex = (props) => {
  let history = useHistory();
  let auth = useAuth();
  const signOut = () => {
  auth.signout(()=>{
    history.replace({ pathname: "/login" });
  });
  }
    return (
        <Box>
          <Navbar/>
        </Box>
    );
}

export default MovieIndex;