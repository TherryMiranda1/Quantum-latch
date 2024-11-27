import { loginUserRequest, registerUserRequest } from "@/infra/api/user";
import { AuthFormUserType, UserOptions } from "../types";
import { useUserInfo } from "@/hooks/useUserInfo";

export const useUsers = (): UserOptions => {
  const {
    currentUser,
    isMember,
    isUserLoaded,
    setCurrentUser,
    logout,
    getUserInfo,
    setToken,
  } = useUserInfo();

  const loginUser = async ({ email, password }: AuthFormUserType) => {
    const data = await loginUserRequest({ email, password });
    if (data) {
      setCurrentUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      return data;
    }
  };

  const registerUser = async ({ email, password }: AuthFormUserType) => {
    const data = await registerUserRequest({ email, password });
    if (data) {
      setCurrentUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      return data;
    }
  };

  return {
    currentUser,
    isMember,
    isUserLoaded,
    setCurrentUser,
    logout,
    getUserInfo,
    loginUser,
    registerUser,
    setToken,
  };
};
