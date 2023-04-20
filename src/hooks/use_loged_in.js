import { isLoged } from "@/services/Auth";
import Links from "@/static/Links";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogedIn = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    isLoged().then(res=>navigate(Links.dashboard))
  }, []);
};

export default useLogedIn;
