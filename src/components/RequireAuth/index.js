import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const { user, isExpiredSession } = useSelector((state) => state.user);
  const location = useLocation();
  if (user) {
    return <Outlet />;
  }

  if (!user && isExpiredSession) {
    return (
      <Navigate
        to="/login"
        state={{ isExpired: true, from: location.pathname }}
      />
    );
  }

  if (!user && !isExpiredSession) {
    return (
      <Navigate
        to="/login"
        state={{ isExpired: false, from: location.pathname }}
      />
    );
  }
}

export default RequireAuth;
