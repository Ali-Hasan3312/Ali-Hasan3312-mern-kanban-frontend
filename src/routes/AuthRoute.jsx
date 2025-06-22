import { Navigate } from "react-router";
import { useUser } from "../contexts/UserContext";



export const AuthRoute = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  } 
  
  return children || null;
}