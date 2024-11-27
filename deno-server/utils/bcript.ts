import { hash, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const bcryptUtils = {
  hashPassword: async (password: string) => await hash(password),
  comparePassword: async (password: string, hash: string) =>
    await compare(password, hash),
};
