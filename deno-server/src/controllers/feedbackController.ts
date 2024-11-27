// deno-lint-ignore-file no-explicit-any
import type { Context } from "hono";
import { IFeedback } from "../models/feedbackModel.ts";
import Joi from "joi";
import { ObjectId } from "mongodb";

const feedbackSchema = Joi.object({
  title: Joi.string().min(3).required(),
  category: Joi.string().required(),
  feeling: Joi.string().required(),
  author: Joi.string().optional(),
  isPublic: Joi.boolean().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const createFeedback = async (c: Context) => {
  const feedbackData: Partial<IFeedback> = await c.req.json();

  const { error } = feedbackSchema.validate(feedbackData);
  if (error) {
    return c.json({ error: error.details[0].message }, 400);
  }

  try {
    const db = c.get("db");
    const author = c.get("userId");
    const newFeedback = {
      ...feedbackData,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("feedbacks").insertOne(newFeedback);
    return c.json(newFeedback, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating feedback" }, 500);
  }
};

export const getFeedbacks = async (c: Context) => {
  const { type } = c.req.query();

  const filter: any = {};

  if (type) {
    filter.type = type;
  }

  try {
    const db = c.get("db");
    const feedbacks = await db.collection("feedbacks").find(filter).toArray();
    return c.json(feedbacks, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching feedbacks" }, 500);
  }
};

export const getFeedback = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const feedback = await db
      .collection("feedbacks")
      .findOne({ _id: new ObjectId(id) });
    if (!feedback) {
      return c.json({ error: "Feedback not found" }, 404);
    }
    return c.json(feedback, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error fetching feedback" }, 500);
  }
};

export const updateFeedback = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData: Partial<IFeedback> = await c.req.json();

  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    const result = await db.collection("feedbacks").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updatedData, updatedAt: new Date() } },
      { returnDocument: "after" } // Obtiene el documento actualizado
    );
    if (!result) {
      return c.json({ error: "Feedback not found" }, 404);
    }

    return c.json(result, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error updating feedback" }, 500);
  }
};

export const deleteFeedback = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "ID is required" }, 400);
  }

  try {
    const db = c.get("db");
    await db
      .collection("feedbacks")
      .findOneAndDelete({ _id: new ObjectId(id) });

    return c.json({ message: "Feedback deleted successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error deleting feedback" }, 500);
  }
};
