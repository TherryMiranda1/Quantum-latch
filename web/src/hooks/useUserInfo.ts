import { UserOptions } from "@/context/GlobalContext/types";
import { getUserInfoRequest } from "@/infra/api/user";
import { User, UserRoles } from "@/types/User";
import { useEffect, useState } from "react";

const getIsMember = (user: User | null): boolean => {
  if (!user) {
    return false;
  }
  return (
    user.role === UserRoles.PREMIUM_USER ||
    user.role === UserRoles.ADMIN ||
    user.role === UserRoles.MODERATOR
  );
};

export const useUserInfo = (): Pick<
  UserOptions,
  | "currentUser"
  | "isMember"
  | "isUserLoaded"
  | "logout"
  | "getUserInfo"
  | "setCurrentUser"
  | "setToken"
> => {
  const localToken = localStorage.getItem("token");
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localToken);

  const getUserInfo = async () => {
    const data = await getUserInfoRequest();

    if (data) {
      setCurrentUser(data);
      localStorage.setItem("userRole", data.role);
      setIsUserLoaded(true);
      return data;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setToken(null);
    setCurrentUser(null);
    setIsUserLoaded(true);
  };

  useEffect(() => {
    if (!token) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
      } else {
        setCurrentUser(null);
        setIsUserLoaded(true);
      }
    }
  }, [token]);

  useEffect(() => {
    if (token && !currentUser) {
      getUserInfo();
    }
  }, [token, currentUser]);

  return {
    currentUser,
    isMember: getIsMember(currentUser),
    isUserLoaded,
    logout,
    getUserInfo,
    setCurrentUser,
    setToken,
  };
};
