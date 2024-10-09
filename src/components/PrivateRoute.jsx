//  RRD
import { Navigate, useLocation } from "react-router-dom";
//  CUSTOM HOOKS
import { useGlobalContext } from "../hooks/useGlobalContext";
function PrivateRoute({ Component }) {
  const location = useLocation();
  const { user } = useGlobalContext();

  return user ? (
    <Component />
  ) : (
    <Navigate to="/login" replace state={{ from: location?.pathname }} />
  );
}

export default PrivateRoute;
