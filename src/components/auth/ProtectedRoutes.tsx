import { useAppSelector } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
