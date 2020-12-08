import React from 'react';
import { useHistory } from "react-router-dom";
import useAuth from "../components/useAuth";

const MovieIndex = (props) => {
  let history = useHistory();
  let auth = useAuth();
    return (
        <div>
            Movie index 
        </div>
    );
}

export default MovieIndex;