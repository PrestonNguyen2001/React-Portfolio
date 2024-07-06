import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // Log the currentUser
  console.log("PrivateRoute - currentUser:", currentUser);

  if (currentUser) {
    console.log("Access granted - rendering Outlet");
  } else {
    console.log("Access denied - navigating to sign-in page");
  }

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
