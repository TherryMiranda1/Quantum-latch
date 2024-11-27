/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { GlobalReturnType } from "./types";
import { useUsers } from "./hooks/useUsers";
import { useUI } from "./hooks/useUI";
import { useRepositories } from "./hooks/useRepositories";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const GlobalContext = createContext<GlobalReturnType>(
  {} as GlobalReturnType
);

export const GlobalContainer = ({ children }: Props) => {
  const user = useUsers();

  const ui = useUI();
  const repositories = useRepositories();

  return (
    <GlobalContext.Provider
      value={{
        user,
        repositories,
        ui,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
