import React from 'react';
import { useHistory } from "react-router-dom";
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
        <div>
            Movie index 
        </div>
    );
}

export default MovieIndex;