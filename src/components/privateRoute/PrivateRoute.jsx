import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  return isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
