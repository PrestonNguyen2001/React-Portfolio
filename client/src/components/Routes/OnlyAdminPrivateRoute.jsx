import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // Log the currentUser and whether they are an admin
  console.log("OnlyAdminPrivateRoute - currentUser:", currentUser);
  console.log("OnlyAdminPrivateRoute - isAdmin:", currentUser?.isAdmin);

  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
