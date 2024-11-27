import axios from "axios";
import { authRequest } from "./utils/apiRequest";
import { Feedback } from "@/types/Feedback";
import { BASE_API_URL } from "../Paths";

export const createFeedbackRequest = async ({
  feedback,
}: {
  feedback: Feedback;
}): Promise<Feedback | null> => {
  const response = await authRequest(
    async (config) =>
      await axios.post(`${BASE_API_URL}/feedbacks`, feedback, config)
  );

  return response as Feedback;
};
