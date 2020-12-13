import { useContext, createContext } from "react";

const authContext = createContext();

export const getAuthContext = () => authContext;

export default function useAuth() {
  return useContext(authContext);
}
