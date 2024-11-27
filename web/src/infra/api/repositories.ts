import axios from "axios";
import { BASE_API_URL } from "../Paths";
import { authRequest } from "./utils/apiRequest";
import { Repository } from "@/types/Repository";
import { toRepository } from "../mappers/toRepository";

export const linkRepositoryRequest = async ({
  repository,
}: {
  repository: Repository;
}): Promise<Repository | null> => {
  const response = await authRequest(
    async (config) =>
      await axios.post(`${BASE_API_URL}/repositories`, repository, config)
  );

  return response as Repository;
};

export const getUserRepositoriesRequest = async ({
  isPublic,
}: {
  isPublic?: boolean;
}): Promise<Repository[] | null> => {
  const querys = new URLSearchParams();
  if (isPublic) {
    querys.set("isPublic", "true");
  }

  const response = await authRequest(
    async (config) =>
      await axios.get(`${BASE_API_URL}/user-repositories?${querys}`, config)
  );

  if (response) {
    return response.map((repository: any) => toRepository(repository));
  }
  return response as Repository[];
};

export const getLinkedRepositoriesRequest = async ({
  isPublic,
}: {
  isPublic?: boolean;
}): Promise<Repository[] | null> => {
  const querys = new URLSearchParams();
  if (isPublic) {
    querys.set("isPublic", "true");
  }

  const response = await authRequest(
    async (config) =>
      await axios.get(`${BASE_API_URL}/repositories?${querys}`, config)
  );

  return response as Repository[];
};

export const getRepositoryByIdRequest = async ({
  repositoryId,
}: {
  repositoryId: string;
}): Promise<Repository | null> => {
  const response = await authRequest(
    async (config) =>
      await axios.get(`${BASE_API_URL}/repositories/${repositoryId}`, config)
  );

  return response as Repository;
};

export const updateRepositoryRequest = async ({
  repository,
}: {
  repository: Repository;
}): Promise<Repository | null> => {
  const { _id, ...data } = repository;
  const response = await authRequest(
    async (config) =>
      await axios.put(`${BASE_API_URL}/repositories/${_id}`, data, config)
  );

  return response as Repository;
};

export const deleteRepositoryRequest = async ({
  repository,
}: {
  repository: Repository;
}): Promise<any> => {
  const response = await authRequest(
    async (config) =>
      await axios.delete(
        `${BASE_API_URL}/repositories/${repository._id}`,
        config
      )
  );

  return response;
};
