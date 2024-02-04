import React from "react";

import {getAuthContext} from "../hooks/useAuth";
import useProvideAuth from "../hooks/useProvideAuth";

export default function ProvideAuth({children}) {
  const authContext = getAuthContext();
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
