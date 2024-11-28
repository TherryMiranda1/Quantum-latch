import { RepositoriesOptions } from "../types";

import { useAsyncCall } from "@/hooks/useAsyncCall";
import {
  getLinkedRepositoriesRequest,
  getUserRepositoriesRequest,
} from "@/infra/api/repositories";

export const useRepositories = (): RepositoriesOptions => {
  const userRepositories = useAsyncCall(getUserRepositoriesRequest);
  const linkedRepositories = useAsyncCall(getLinkedRepositoriesRequest);

  return {
    userRepositories,
    linkedRepositories,
  };
};
