export const getUserRole = (): string | null => {
  return localStorage.getItem("userRole");
};
