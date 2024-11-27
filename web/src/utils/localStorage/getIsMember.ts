import { UserRoles } from "@/types/User";
import { getUserRole } from "./getUserRole";

export const getIsMember = () => {
  const userRole = getUserRole();
  return (
    userRole === UserRoles.ADMIN ||
    userRole === UserRoles.MODERATOR ||
    userRole === UserRoles.PREMIUM_USER ||
    userRole === UserRoles.USER
  );
};
