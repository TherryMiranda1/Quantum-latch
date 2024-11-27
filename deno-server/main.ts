import { Hono } from "hono";
import { cors } from "hono/cors";
import { renderer } from "./renderer.tsx";
import userRoutes from "./src/routes/userRoutes.ts";
import assetRoutes from "./src/routes/assetRoutes.ts";
import { dbMiddleware } from "./src/middleware/dbMiddleware.ts";
import { AppContext } from "./types.d.ts";
import { authMiddleware } from "./src/middleware/authMiddleware.ts";

import feedbackRoutes from "./src/routes/feedbackRoutes.ts";

import repositoryRoutes from "./src/routes/repositoriesRoutes.ts";

const app = new Hono<AppContext>();

app.use(renderer);
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
  })
);
app.use("*", dbMiddleware);

app.use("*", async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.use("/api/users/*", authMiddleware);
app.use("/api/me/*", authMiddleware);
app.use("/api/feedbacks/*", authMiddleware);
app.use("/api/repositories/*", authMiddleware);
app.use("/api/user-repositories/*", authMiddleware);

app.route("/api", userRoutes);
app.route("/api", assetRoutes);
app.route("/api", feedbackRoutes);
app.route("/api", repositoryRoutes);

// Manejo de rutas no encontradas
app.notFound((c) => c.json({ error: "Not Found" }, 404));

// Ruta de inicio
app.get("/", (c) => {
  return c.render("Looks like it works!");
});

// Exportar la aplicación
export default app;
