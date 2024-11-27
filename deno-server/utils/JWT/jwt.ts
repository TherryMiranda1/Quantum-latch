import { App } from "npm:@octokit/app";
import {
  create,
  verify,
  decode,
  getNumericDate,
} from "https://deno.land/x/djwt@v2.8/mod.ts";

const SECRET_STRING = "your_secret_key";

async function createCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder().encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    enc,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

const SECRET_KEY = await createCryptoKey(SECRET_STRING);

export async function generateJWT(userId: string) {
  return await create(
    { alg: "HS256", typ: "JWT" },
    { userId, exp: getNumericDate(60 * 60 * 24 * 30) },
    SECRET_KEY
  );
}

// deno-lint-ignore no-explicit-any
export async function generatePayloadJWT(payload: any, secretKey: string) {
  const cryptoKey = await createCryptoKey(secretKey);
  return await create({ alg: "RS256", typ: "JWT" }, payload, cryptoKey);
}

export async function verifyJWT(token: string) {
  try {
    return await verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Token inválido o expirado", error);
    return null;
  }
}

export function decodeJWT(token: string) {
  try {
    return decode(token);
  } catch (error) {
    console.error("Token inválido o expirado", error);
    return null;
  }
}

export const jwtUtils = {
  generatePayloadJWT,
  generateJWT,
  verifyJWT,
  decodeJWT,
};
