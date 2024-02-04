import React from "react";
import {Redirect, Route, useLocation} from "react-router-dom";
import {getUserIdentityObject} from "../utility/localStorageUtility";
import useAuth from "../hooks/useAuth";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function AuthRoute({children, ...rest}) {
    let auth = useAuth();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};
    return (
        <Route
            {...rest}
      render={({ location }) =>
        !(auth.user || getUserIdentityObject()) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `${from.pathname}`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
