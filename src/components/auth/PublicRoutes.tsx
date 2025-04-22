import { useAppSelector } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
