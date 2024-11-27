import { Hono } from "hono";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyUserInfo,
} from "../controllers/userController.ts";

import {
  loginWithEmailController,
  registerWithEmailController,
} from "../controllers/authController.ts";
import { adminMiddleware } from "../middleware/authMiddleware.ts";

import {
  appGithubCallbackController,
  authWithGithubCallbackController,
  authWithGithubController,
} from "../controllers/socialAuth/githubController.ts";

const router = new Hono();

router.get("/users", adminMiddleware, getUsers);
router.put("/users/:id", adminMiddleware, updateUser);
router.delete("/users/:id", adminMiddleware, deleteUser);

router.get("/me", getMyUserInfo);

router.post("/users", createUser);
router.get("/users/:id", getUser);

router.get("/auth/github", authWithGithubController);
router.get("/auth/github/callback", authWithGithubCallbackController);
router.get("/auth/github/app-callback", appGithubCallbackController);

router.post("/auth/login", loginWithEmailController);
router.post("/auth/signup", registerWithEmailController);

export default router;
