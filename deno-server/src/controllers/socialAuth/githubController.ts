import type { Context } from "hono";

import { urlUtils } from "../../../utils/params.ts";
import { environment } from "../../environment.ts";
import { textUtils } from "../../../utils/text.ts";
import { jwtUtils } from "../../../utils/JWT/jwt.ts";
import { findOrCreateUser } from "../authController.ts";
import { githubService } from "../../services/session/githubService.ts";
import { IRepository } from "./../../models/repositoriesModel.ts";

export const authWithGithubController = async (c: Context) => {
  try {
    const { uri, codeVerifier } = await githubService.getCode();

    const redirectUri = urlUtils.encodeParam(codeVerifier, uri);
    return c.redirect(redirectUri.href);
  } catch (error) {
    console.error(
      "Error al obtener el enlace de autenticación de GitHub:",
      error
    );
    return c.redirect(
      `${environment.FRONTEND_ORIGIN}?auth_error=${textUtils.formatTextToSlug(
        "Error al autenticar con GitHub"
      )}`
    );
  }
};

export const authWithGithubCallbackController = async (c: Context) => {
  try {
    const codeVerifier = urlUtils.decodeParam(c.req.query("state") || "");
    if (!codeVerifier || typeof codeVerifier !== "string") {
      throw new Error("Invalid codeVerifier");
    }

    const tokens = await githubService.getTokens(c.req.url, codeVerifier);

    const userInfo = await githubService.getUserInfo(tokens);
    const user = await findOrCreateUser(
      c,
      {
        ...userInfo,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenType: tokens.tokenType,
      },
      "GitHub"
    );

    const jwt = await jwtUtils.generateJWT(user._id);

    return c.redirect(`${environment.FRONTEND_ORIGIN}?token=${jwt}`);
  } catch (error) {
    console.error("Error en autenticación de GitHub:", error);

    return c.redirect(
      `${environment.FRONTEND_ORIGIN}?auth_error=${textUtils.formatTextToSlug(
        "Error al autenticar con GitHub"
      )}`
    );
  }
};

export const appGithubCallbackController = async (c: Context) => {
  try {
    const installationId = c.req.query("installation_id");

    if (!installationId || typeof installationId !== "string") {
      return c.redirect(
        `${environment.FRONTEND_ORIGIN}?auth_error=${textUtils.formatTextToSlug(
          "Error al autenticar con GitHub"
        )}`
      );
    }

    const tokens = await githubService.getInstallationToken(installationId);
    console.log(tokens);

    // const installations = await githubService.listInstallations(
    //   installationId,
    //   tokens.token
    // );

    return c.redirect(`${environment.FRONTEND_ORIGIN}`);
  } catch (error) {
    console.error("Error en autenticación de GitHub:", error);

    return c.redirect(
      `${environment.FRONTEND_ORIGIN}?auth_error=${textUtils.formatTextToSlug(
        "Error al autenticar con GitHub"
      )}`
    );
  }
};

export const findOrCreateRepo = async (
  c: Context,
  repositoryData: Partial<IRepository>
) => {
  try {
    const db = c.get("db");
    const existingRepository = await db
      .collection("repositories")
      .findOne({ githubId: repositoryData.githubId });

    if (existingRepository) {
      return existingRepository;
    }

    const newRepository = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("repositories").insertOne(newRepository);
    return { ...newRepository, _id: result.insertedId };
  } catch (err) {
    return c.json({ error: `Error creating user, ${err}` }, 500);
  }
};
