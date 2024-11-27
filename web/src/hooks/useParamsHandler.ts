import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { useTokenStorage } from "./useTokenStorage";
import { useAuthErrorHandler } from "./useAuthErrorHandler";

export const useParamsHandler = () => {
  const location = useLocation();
  const { handleTokenStorage } = useTokenStorage();
  const { handleAuthError } = useAuthErrorHandler();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const auth_error = params.get("auth_error");

    if (token) {
      handleTokenStorage(params, token);
    }

    if (auth_error) {
      handleAuthError(params, auth_error);
    }
  }, [location, handleTokenStorage, handleAuthError]);
};
