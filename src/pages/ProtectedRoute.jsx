import { Navigate } from "react-router-dom";
//import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({children}) {
  const {isAuthenticated} = useAuth()
  //const navigate = useNavigate

  /*useEffect(() => {
    if (!isAuthenticated)
    navigate('/')
    }, [isAuthenticated, navigate]) */

  // alternative approach to avoid useEffect
  //if (isAuthenticated)
  //return <Navigate to='/' />

  return isAuthenticated ? children : <Navigate to="/" />;
}