// deno-lint-ignore-file no-explicit-any
import type { Context } from "hono";

import { createAppAuth } from "npm:@octokit/auth-app";
import { Octokit } from "npm:@octokit/core";

import { environment } from "../environment.ts";
import { latchService } from "../services/latch/latchService.ts";

const auth = createAppAuth({
  appId: environment.GITHUB_APP_ID || "-",
  privateKey: environment.GITHUB_APP_SECRET_KEY || "-",
  clientId: environment.GITHUB_CLIENT_ID || "-",
  clientSecret: environment.GITHUB_CLIENT_SECRET || "-",
});

const createCheckRun = async (data: any, db: any) => {
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: environment.GITHUB_APP_ID,
      installationId: data.installation.id,
      privateKey: environment.GITHUB_APP_SECRET_KEY,
    },
  });

  const owner = data.repository?.owner?.login;
  const repo = data.repository?.name;
  const sha = data.check_suite?.head_sha || data.pull_request.base.sha;

  const userInfo = await db
    .collection("users")
    .findOne({ githubId: data.repository?.owner?.id });

  if (
    !userInfo ||
    !userInfo.latchAccountId ||
    !environment.LATCH_OPERATION_ID
  ) {
    return;
  }

  const status = await latchService.getStatus(userInfo.latchAccountId);

  const operationStatus =
    status.operations[environment.LATCH_OPERATION_ID].status;

  const checkConclusion = operationStatus === "on" ? "success" : "failure";

  await appOctokit.request(`POST /repos/${owner}/${repo}/check-runs`, {
    name: "Quantum check",
    head_sha: sha,
    status: operationStatus ? "completed" : "in_progress", // queued, in_progress, completed
    conclusion: checkConclusion, // success, failure, neutral, cancelled
  });
};

const authenticateApp = async () => {
  const appAuthentication = await auth({
    type: "app",
  });
  const octokit = new Octokit({ auth: appAuthentication.token });

  const { data } = await octokit.request("GET /app/installations");

  return data;
};

export const handleWebhook = async (c: Context) => {
  try {
    const db = c.get("db");
    const data: Partial<any> = await c.req.json();
    const event = c.req.header("X-GitHub-Event"); //pull_request

    await authenticateApp();
    if (
      event === "check_suite" &&
      (data.action === "requested" || data.action === "rerequested")
    ) {
      await createCheckRun(data, db);
    }

    if (
      event === "pull_request" &&
      (data.action === "opened" || data.action === "reopened")
    ) {
      await createCheckRun(data, db);
    }
    const newEvent = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("events").insertOne(newEvent);
    return c.json(newEvent, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating asset" }, 500);
  }
};
