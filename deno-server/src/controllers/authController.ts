import type { Context } from "hono";
import Joi from "joi";

import { IUser } from "../models/userModel.ts";
import { jwtUtils } from "../../utils/JWT/jwt.ts";
import { bcryptUtils } from "./../../utils/bcript.ts";

const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
});

export const registerWithEmailController = async (c: Context) => {
  const userData: Pick<IUser, "email" | "password"> = await c.req.json();
  const { error } = userSchema.validate(userData);

  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const existingUser = await db
      .collection("users")
      .findOne({ email: userData.email });

    if (existingUser) {
      return c.json(
        { error: "El email ya existe, por favor inicia sesión" },
        400
      );
    }

    const hashedPassword = await bcryptUtils.hashPassword(userData.password);

    const newUser = {
      email: userData.email,
      password: hashedPassword,
      provider: "email",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    const jwt = await jwtUtils.generateJWT(result.insertedId);

    return c.json({
      newUser: {
        _id: result.insertedId,
        email: newUser.email,
        role: newUser.role,
      },
      token: jwt,
    });
  } catch (error) {
    console.error("Error en autenticación de correo:", error);
    return c.text("Error al autenticar con correo", 500);
  }
};

export const loginWithEmailController = async (c: Context) => {
  const userData: Pick<IUser, "email" | "password"> = await c.req.json();
  const { error } = userSchema.validate(userData);

  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const user = await db
      .collection("users")
      .findOne({ email: userData.email });

    if (!user) {
      return c.json({ error: "Email o contraseña incorrectos" }, 400);
    }

    if (user.provider !== "email") {
      return c.json({ error: "Este usuario se ha registrado con SSO" }, 400);
    }

    const validPassword = await bcryptUtils.comparePassword(
      userData.password,
      user.password
    );

    if (!validPassword) {
      return c.json({ error: "Email o contraseña incorrectos" }, 400);
    }

    const jwt = await jwtUtils.generateJWT(user._id);

    return c.json({ user, token: jwt });
  } catch (_) {
    return c.text("Error al autenticar con correo", 500);
  }
};

export const findOrCreateUser = async (
  c: Context,
  userData: Partial<IUser>,
  provider: string
) => {
  try {
    const db = c.get("db");
    const existingUser = await db
      .collection("users")
      .findOne({ email: userData.email });

    if (existingUser) {
      await db.collection("users").updateOne(
        { email: userData.email },
        {
          $set: {
            updatedAt: new Date(),
            githubId: userData.githubId,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
          },
        }
      );

      return existingUser;
    }

    const newUser = {
      name: userData.name,
      email: userData.email,
      profileImage: userData.avatar_url,
      url: userData.url,
      bio: userData.bio,
      provider,
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
      tokenType: userData.tokenType,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  } catch (err) {
    return c.json({ error: `Error creating user, ${err}` }, 500);
  }
};
