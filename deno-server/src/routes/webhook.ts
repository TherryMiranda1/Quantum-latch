// src/routes/repositoryRoutes.ts
import { Hono } from "hono";
import { handleWebhook } from "./../controllers/webhookControler.ts";

const webhookRoutes = new Hono();

webhookRoutes.post("/webhook", handleWebhook);

export default webhookRoutes;
