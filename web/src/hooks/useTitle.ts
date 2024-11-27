import { useLocation } from "@tanstack/react-router";

const titlesByPath: Record<string, string> = {
  ["/"]: "Quantum",
  ["/login"]: "Login",
  ["/signup"]: "Sign Up",
  ["/me"]: "Profile",
  ["/app"]: "Dahsboard",
  ["/product"]: "",
};

export const useTitle = () => {
  const { pathname } = useLocation();

  return titlesByPath[pathname] || "";
};
