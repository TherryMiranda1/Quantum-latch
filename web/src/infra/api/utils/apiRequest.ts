import { getAuthToken } from "@/utils/localStorage/getAuthToken";
import { AxiosRequestConfig, AxiosResponse } from "axios";


export const authRequest = async <T>(
  requestFn: (config: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const token = getAuthToken();

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await requestFn(config);
    return response.data;
  } catch (error) {
    console.error("Error en la petición API:", error);
    throw error;
  }
};
