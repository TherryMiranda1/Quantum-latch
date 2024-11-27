import { useLocation, useNavigate } from "@tanstack/react-router";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";

export const useTokenStorage = () => {
  const {
    user: { getUserInfo, setToken },
  } = useGlobalContext();

  const location = useLocation();
  const navigate = useNavigate();

  const handleTokenStorage = async (params: URLSearchParams, token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    await getUserInfo();
    const newPath = location.pathname == "/" ? "/product" : location.pathname;

    params.delete("token");
    navigate({
      to: newPath + params.toString(),
      replace: true,
    });
  };

  return {
    handleTokenStorage,
  };
};
