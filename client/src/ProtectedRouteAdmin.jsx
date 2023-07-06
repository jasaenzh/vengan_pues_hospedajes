import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function ProtectedRouteAdmin() {
  const { isAuthenticated, loading, user } = useAuth();

  if (!loading && !isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />
  }

  if (loading) return <h1>Cargando...</h1>;

  if (isAuthenticated && user?.permissions.includes("adminAccess")) {
    return <Outlet />;
  }
}

export default ProtectedRouteAdmin