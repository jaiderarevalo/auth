import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { loading,isAuthenticated } = useAuth();
  
  if(loading){
    <h1>loading...</h1>
  }
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
    
 return <Outlet />;
  
}

export default ProtectedRoute;
