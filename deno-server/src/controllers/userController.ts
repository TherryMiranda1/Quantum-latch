import type { Context } from "hono";
import { IUser } from "../models/userModel.ts";
import Joi from "joi";
import { ObjectId } from "mongodb";

const userSchema = Joi.object({
  userUUID: Joi.string().required(),
  name: Joi.string().min(3),
  email: Joi.string().email({ tlds: { allow: false } }),
});

export const createUser = async (c: Context) => {
  const userData: Partial<IUser> = await c.req.json();
  const { error } = userSchema.validate(userData);

  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const existingUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userData._id) });

    if (existingUser) {
      return c.json(existingUser, 200);
    }

    const newUser = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);
    return c.json(newUser, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating user" }, 500);
  }
};

export const getUsers = async (c: Context) => {
  try {
    const db = c.get("db");
    const users = await db.collection("users").find().toArray();
    const mappedUsers = users.map((user: IUser) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    }));
    return c.json(mappedUsers, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching users" }, 500);
  }
};

export const getUser = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const user = await db.collection("users").findOne({ userUUID: id });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json(user, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching user" }, 500);
  }
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData: Partial<IUser> = await c.req.json();

  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const user = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updatedData, updatedAt: new Date() } },
      { returnDocument: "after" } // `returnDocument: "after"` es para obtener el documento actualizado
    );

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({}, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error updating user" }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    await db.collection("users").findOneAndDelete({ _id: new ObjectId(id) });

    return c.json({ message: "User deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting user" }, 500);
  }
};

export const getMyUserInfo = async (c: Context) => {
  try {
    const db = c.get("db");
    const userId = c.get("userId");

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId as string) });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const mappedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileUrl: user.profileUrl,
      bio: user.bio,
      profileImage: user.profileImage,
      provider: user.provider,
    };
    return c.json(mappedUser, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching user" }, 500);
  }
};
