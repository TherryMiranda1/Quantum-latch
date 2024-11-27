// deno-lint-ignore-file no-explicit-any
import type { Context } from "hono";

import Joi from "joi";
import { ObjectId } from "mongodb";
import type { IRepository } from "../models/repositoriesModel.ts";
import { githubService } from "../services/session/githubService.ts";

export type RepositoryFormat = "markdown" | "html";

const repositorySchema = Joi.object({
  title: Joi.string().min(3).required(),
  repositoryContent: Joi.string().required(),
  format: Joi.string().optional(),
  author: Joi.string().optional(),
  category: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  links: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional(),
  isPublic: Joi.boolean().optional(),
  image: Joi.string().optional(),
  video: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

const _idSchema = Joi.string()
  .required()
  .pattern(/^[0-9a-fA-F]{24}$/);

export const createRepository = async (c: Context) => {
  const repositoryData: Partial<IRepository> = await c.req.json();

  const { error } = repositorySchema.validate(repositoryData);
  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const author = c.get("userId");
    const newRepository = {
      ...repositoryData,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("repositories").insertOne(newRepository);
    return c.json(newRepository, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating repository" }, 500);
  }
};

export const getUserRepositories = async (c: Context) => {
  const { category, isPublic } = c.req.query();

  const filter: any = {};

  if (category) {
    filter.category = category;
  }
  if (isPublic) {
    filter.isPublic = isPublic;
  }

  try {
    const userId = c.get("userId");
    const db = c.get("db");

    const userData = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    const repositories = await githubService.getUserRepositories({
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
      tokenType: userData.tokenType,
    });
    return c.json(repositories, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching repositories" }, 500);
  }
};

export const getLinkedRepositories = async (c: Context) => {
  const { category, isPublic } = c.req.query();

  const filter: any = {};

  if (category) {
    filter.category = category;
  }
  if (isPublic) {
    filter.isPublic = isPublic;
  }

  try {
    const db = c.get("db");
    const repositories = await db
      .collection("repositories")
      .find(filter)
      .toArray();
    return c.json(repositories, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching repositories" }, 500);
  }
};

export const getRepository = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  const { error } = _idSchema.validate(id);
  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const repository = await db
      .collection("repositories")
      .findOne({ _id: new ObjectId(id) });
    if (!repository) {
      return c.json({ error: "Repository not found" }, 404);
    }
    return c.json(repository, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching repository" }, 500);
  }
};

export const updateRepository = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData: Partial<IRepository> = await c.req.json();

  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const result = await db.collection("repositories").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updatedData, updatedAt: new Date() } },
      { returnDocument: "after" } // Obtiene el documento actualizado
    );
    if (!result) {
      return c.json({ error: "Repository not found" }, 404);
    }

    return c.json(result, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error updating repository" }, 500);
  }
};

export const deleteRepository = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    await db
      .collection("repositories")
      .findOneAndDelete({ _id: new ObjectId(id) });

    return c.json({ message: "Repository deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting repository" }, 500);
  }
};
