import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const Redirect = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default Redirect;
