// src/routes/feedbackRoutes.ts
import { Hono } from "hono";
import {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.ts";
import {
  adminMiddleware
} from "../middleware/authMiddleware.ts";

const feedbackRoutes = new Hono();

feedbackRoutes.post("/feedbacks", createFeedback);

feedbackRoutes.get("/feedbacks/:id", adminMiddleware, getFeedback);
feedbackRoutes.get("/feedbacks", adminMiddleware, getFeedbacks);
feedbackRoutes.put("/feedbacks/:id", adminMiddleware, updateFeedback);
feedbackRoutes.delete("/feedbacks/:id", adminMiddleware, deleteFeedback);

export default feedbackRoutes;
