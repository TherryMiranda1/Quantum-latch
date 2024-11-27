// src/routes/repositoryRoutes.ts
import { Hono } from "hono";
import {
  createRepository,
  getLinkedRepositories,
  getRepository,
  updateRepository,
  deleteRepository,
  getUserRepositories,
} from "../controllers/repositoryController.ts";
import { userMiddleware } from "../middleware/authMiddleware.ts";

const repositoryRoutes = new Hono();

repositoryRoutes.get("/user-repositories", userMiddleware, getUserRepositories);

repositoryRoutes.get("/repositories", userMiddleware, getLinkedRepositories);
repositoryRoutes.get("/repositories/:id", userMiddleware, getRepository);

repositoryRoutes.post("/repositories", userMiddleware, createRepository);
repositoryRoutes.put("/repositories/:id", userMiddleware, updateRepository);
repositoryRoutes.delete("/repositories/:id", userMiddleware, deleteRepository);

export default repositoryRoutes;
