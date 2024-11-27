import { RepositoriesOptions } from "../types";
import { Repository } from "@/types/Repository";
import { useAsyncCall } from "@/hooks/useAsyncCall";
import {
  getLinkedRepositoriesRequest,
  getUserRepositoriesRequest,
} from "@/infra/api/repositories";

export const useRepositories = (): RepositoriesOptions => {
  const userRepositories = useAsyncCall(getUserRepositoriesRequest);
  const linkedRepositories = useAsyncCall(getLinkedRepositoriesRequest);

  const addRepository = (repository: Repository) => {
    console.log(repository);
  };

  return {
    userRepositories,
    linkedRepositories,
    addRepository,
  };
};
