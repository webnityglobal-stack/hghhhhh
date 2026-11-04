
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("medicareUser") || "null");
  } catch {
    user = null;
  }

  const isLoggedIn = Boolean(user?.email);

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;
