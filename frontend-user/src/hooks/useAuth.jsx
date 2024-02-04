import {createContext, useContext} from "react";

const authContext = createContext(null);

export const getAuthContext = () => authContext;

export default function useAuth() {
  return useContext(authContext);
}
