// deno-lint-ignore-file no-explicit-any
import type { Context } from "hono";
import { latchService } from "./../../services/latch/latchService.ts";
import { ObjectId } from "mongodb";
import { environment } from "../../environment.ts";

export const pairLatch = async (c: Context) => {
  try {
    const { code } = c.req.query();

    const onSuccess = async (result: any) => {
      if (!result?.data?.accountId) {
        return c.json({ error: "Error pairing with latch" }, 400);
      }

      const db = c.get("db");
      const userId = c.get("userId");
      const existingUser = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });

      if (existingUser) {
        await db.collection("users").updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              updatedAt: new Date(),
              isPaired: true,
              latchAccountId: result.data.accountId,
            },
          }
        );

        return existingUser;
      }
    };

    await latchService.pair(code, onSuccess);

    return c.json({ message: "linked successfully" }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error" }, 500);
  }
};

export const getLatchStatus = async (c: Context) => {
  try {
    const db = c.get("db");
    const userId = c.get("userId");

    const existingUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!existingUser || !existingUser.isPaired) {
      return c.json({ error: "User not found" }, 404);
    }

    const data = await latchService.getStatus(existingUser.latchAccountId);

    if (
      !data ||
      !environment.LATCH_OPERATION_ID ||
      !data?.operations?.[environment.LATCH_OPERATION_ID]
    ) {
      return c.json({ error: "Error obtaining latch status" }, 400);
    }

    const operation = data.operations[environment.LATCH_OPERATION_ID].status;

    return c.json({ operation }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error" }, 500);
  }
};
