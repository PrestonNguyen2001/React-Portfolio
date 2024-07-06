import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // Log the currentUser and whether they are an admin
  console.log("OnlyAdminPrivateRoute - currentUser:", currentUser);
  console.log("OnlyAdminPrivateRoute - isAdmin:", currentUser?.isAdmin);

  if (currentUser && currentUser.isAdmin) {
    console.log("Access granted - rendering Outlet");
  } else {
    if (!currentUser) {
      console.log("Access denied - no user logged in");
    } else if (!currentUser.isAdmin) {
      console.log("Access denied - user is not an admin");
    }
    console.log("Navigating to sign-in page");
  }

  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
