import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuth } from "../middlewares/ProtectedRoutes";

const useSession = () => {
  const session = isAuth();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();

  const checkTokenExpirationDate = () => {
    const convertUnixDateToMilliseconds = decodedSession.exp * 1000;
    const expirationDate = new Date(convertUnixDateToMilliseconds);
    const currentDate = new Date();

    if (expirationDate < currentDate) {
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
    checkTokenExpirationDate();
  }, [navigate, session]);

  return decodedSession;
};

export default useSession;
