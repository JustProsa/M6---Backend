import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export const isAuth = () => {
  return JSON.parse(localStorage.getItem("loggedInUser")); //ritorna un true o false se esiste questa key
};

const ProtectedRoutes = () => {
  const auth = isAuth();

  return auth ? <Outlet /> : <Login />; //L'Outlet è qualsiasi figlio della ProtectedRoute
};

export default ProtectedRoutes;
