import axios from "axios";

import { BASE_API_URL } from "../Paths";
import { User } from "@/types/User";
import { authRequest } from "./utils/apiRequest";

export const updateUserRequest = async ({
  user,
}: {
  user: User;
}): Promise<User | null> => {
  const { _id, ...data } = user;
  const response = await axios.put(`${BASE_API_URL}/users/${_id}`, data);

  return response.data as User;
};

export const getUserInfoRequest = async (): Promise<User | null> => {
  const response = await authRequest(
    async (config) => await axios.get(`${BASE_API_URL}/me`, config)
  );

  return response;
};

export const loginUserRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: User; token: string } | null> => {
  const response = await axios.post(`${BASE_API_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUserRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: User; token: string } | null> => {
  const response = await axios.post(`${BASE_API_URL}/auth/signup`, {
    email,
    password,
  });

  return response.data;
};
