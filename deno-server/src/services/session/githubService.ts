import {
  OAuth2Client,
  Tokens,
} from "https://deno.land/x/oauth2_client@v1.0.2/mod.ts";
import { environment } from "../../environment.ts";
import { createAppAuth } from "npm:@octokit/auth-app";

// import { Octokit } from "npm:@octokit/core";

const oauth2Client = new OAuth2Client({
  clientId: environment.GITHUB_CLIENT_ID || "",
  clientSecret: environment.GITHUB_CLIENT_SECRET || "",
  redirectUri: environment.GITHUB_REDIRECT_URI || "",
  authorizationEndpointUri: "https://github.com/login/oauth/authorize",
  tokenUri: "https://github.com/login/oauth/access_token",
  defaults: {
    scope: ["openid", "email", "profile"],
  },
});

const auth = createAppAuth({
  appId: environment.GITHUB_APP_ID || "-",
  privateKey: environment.GITHUB_APP_SECRET_KEY || "-",
  clientId: environment.GITHUB_CLIENT_ID || "-",
  clientSecret: environment.GITHUB_CLIENT_SECRET || "-",
});

const getCode = async () => {
  return await oauth2Client.code.getAuthorizationUri();
};

const getTokens = async (url: string, codeVerifier: string) => {
  return await oauth2Client.code.getToken(url, {
    codeVerifier,
  });
};

const getUserInfo = async (tokens: Tokens) => {
  const userInfo = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  const userInfoJson = await userInfo.json();

  return userInfoJson;
};

const getUserRepositories = async (tokens: Tokens) => {
  const userRepos = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  const userReposJson = await userRepos.json();

  return userReposJson;
};

const getInstallationToken = async (installationId: string) => {
  const installationAuthentication = await auth({
    type: "app",
  });

  const appToken = installationAuthentication.token;

  const response = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      body: JSON.stringify({}),
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${appToken}`,
      },
    }
  );

  const responseJson = await response.json();
  return responseJson;
};

const listInstallations = async (installationId: string, token: string) => {
  const installationAuthentication = await auth({
    type: "app",
  });

  const appToken = installationAuthentication.token;

  const response = await fetch(
    `https://api.github.com/user/installations/${installationId}/repositories`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseJson = await response.json();
  return responseJson;
};

export const githubService = {
  getCode,
  getTokens,
  getUserInfo,
  getUserRepositories,
  getInstallationToken,
  listInstallations,
};
