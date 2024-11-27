const MONGODB_URI = Deno.env.get("MONGODB_URI");

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const REDIRECT_URI = Deno.env.get("REDIRECT_URI");

const GITHUB_CLIENT_ID = Deno.env.get("GITHUB_CLIENT_ID");
const GITHUB_CLIENT_SECRET = Deno.env.get("GITHUB_CLIENT_SECRET");
const GITHUB_REDIRECT_URI = Deno.env.get("GITHUB_REDIRECT_URI");

const GITHUB_APP_ID = Deno.env.get("GITHUB_APP_ID");
const GITHUB_APP_SECRET_KEY = Deno.env.get("GITHUB_APP_SECRET_KEY");

const LINKEDIN_CLIENT_ID = Deno.env.get("LINKEDIN_CLIENT_ID");
const LINKEDIN_CLIENT_SECRET = Deno.env.get("LINKEDIN_CLIENT_SECRET");
const LINKEDIN_REDIRECT_URI = Deno.env.get("LINKEDIN_REDIRECT_URI");

const NODE_ENV = Deno.env.get("NODE_ENV");
const JWT_SECRET_KEY = Deno.env.get("JWT_SECRET_KEY");
const TOKEN_EXPIRES_IN = Deno.env.get("TOKEN_EXPIRES_IN");
const FRONTEND_ORIGIN = Deno.env.get("FRONTEND_ORIGIN");

const EMAIL_ADDRESS = Deno.env.get("EMAIL_ADDRESS");
const EMAIL_PASSWORD = Deno.env.get("EMAIL_PASSWORD");
const EMAIL_SERVICE_URL = Deno.env.get("EMAIL_SERVICE_URL");

export const environment = {
  MONGODB_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_REDIRECT_URI,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
  GITHUB_APP_ID,
  GITHUB_APP_SECRET_KEY,
  NODE_ENV,
  JWT_SECRET_KEY,
  TOKEN_EXPIRES_IN,
  FRONTEND_ORIGIN,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  EMAIL_SERVICE_URL,
};
