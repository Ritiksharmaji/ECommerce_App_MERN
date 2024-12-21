import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Redirect unauthenticated users to login page for protected routes
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Prevent authenticated users from accessing login or register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Restrict non-admin users from accessing admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Restrict admin users from accessing shopping routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Allow navigation to the intended path if all conditions pass
  return <>{children}</>;
}

export default CheckAuth;
