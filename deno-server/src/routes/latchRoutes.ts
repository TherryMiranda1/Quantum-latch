import { Hono } from "hono";
import {
  pairLatch,
  getLatchStatus,
} from "../controllers/latchController/latchController.ts";

const latchRoutes = new Hono();

latchRoutes.get("/latch-pair", pairLatch);
latchRoutes.get("/latch-status", getLatchStatus);
export default latchRoutes;
