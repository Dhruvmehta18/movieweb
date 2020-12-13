import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserIdentityObject } from "../utility/localStorageUtility";
import useAuth from "./useAuth";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user || getUserIdentityObject() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
