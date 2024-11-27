import { formatSlugToText } from "@/utils/formatSlugToText";
import { useLocation, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const useAuthErrorHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthError = async (params: URLSearchParams, error: string) => {
    const newPath = location.pathname == "/" ? "/" : location.pathname;

    params.delete("auth_error");
    toast.error(`${formatSlugToText(error)} intentalo de nuevo`);
    navigate({
      to: newPath + params.toString(),
    });
  };

  return {
    handleAuthError,
  };
};
