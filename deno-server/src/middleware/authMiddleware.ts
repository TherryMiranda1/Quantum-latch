import { MiddlewareHandler } from "hono";
import { AppContext } from "../../types.d.ts";
import { jwtUtils } from "../../utils/JWT/jwt.ts";
import { ObjectId } from "mongodb";
import { UserRoles } from "../models/userModel.ts";

export const authMiddleware: MiddlewareHandler<AppContext> = async (
  c,
  next
) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) return c.text("Authorization header missing", 401);

  const token = authHeader.split(" ")[1];
  const payload = await jwtUtils.verifyJWT(token);
  if (!payload) return c.text("Invalid or expired token", 401);

  c.set("userId", payload.userId);

  await next();
};

export const adminMiddleware: MiddlewareHandler<AppContext> = async (
  c,
  next
) => {
  try {
    const userId = c.get("userId");
    const db = c.get("db");

    const existingUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId as string) });

    if (!existingUser) {
      return c.text("User not found", 401);
    }

    if (existingUser.role !== UserRoles.ADMIN) {
      return c.text("Unauthorized", 401);
    }
  } catch (error) {
    return c.text(`authError ${error}`, 403);
  }
  await next();
};

export const userMiddleware: MiddlewareHandler<AppContext> = async (
  c,
  next
) => {
  try {
    const userId = c.get("userId");
    const db = c.get("db");

    const existingUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId as string) });

    if (!existingUser) {
      return c.text("User not found", 401);
    }

    const isAuthorized =
      existingUser.role === UserRoles.USER ||
      existingUser.role === UserRoles.PREMIUM_USER ||
      existingUser.role === UserRoles.MODERATOR ||
      existingUser.role === UserRoles.ADMIN;

    if (!isAuthorized) {
      return c.text("Unauthorized", 401);
    }
  } catch (error) {
    return c.text(`authError ${error}`, 403);
  }

  await next();
};
