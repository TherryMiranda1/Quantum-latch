import axios from "axios";
import { authRequest } from "./utils/apiRequest";
import { BASE_API_URL } from "../Paths";

export const pairLatchRequest = async ({
  code,
}: {
  code: string;
}): Promise<any> => {
  const response = await authRequest(
    async (config) =>
      await axios.get(`${BASE_API_URL}/latch-pair?code=${code}`, config)
  );

  return response;
};

export const getStatusRequest = async (): Promise<any> => {
    const response = await authRequest(
      async (config) =>
        await axios.get(`${BASE_API_URL}/latch-status`, config)
    );
  
    return response;
  };