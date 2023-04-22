import { isLoged } from "@/services/Auth";
import Links from "@/static/Links";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogedOut = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    isLoged()
      .then(res=>{})
      .catch((err) => {
        navigate(Links.home);
      });
  }, []);
};

export default useLogedOut;
