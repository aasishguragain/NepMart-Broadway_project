import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home", { replace: true });
    }

    if (!isLoggedIn && pathname === "/") {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate, pathname]);

  return props.children;
};

export default GuestGuard;
