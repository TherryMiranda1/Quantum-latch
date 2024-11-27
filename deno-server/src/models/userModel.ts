// userModel.ts
import { ObjectId } from "mongodb";

export enum UserRoles {
  USER = "user",
  PREMIUM_USER = "premium-user",
  MODERATOR = "moderator",
  ADMIN = "admin",
}

export enum UserProviders {
  GOOGLE = "google",
  APP = "app",
  HOTMART = "hotmart",
}

export interface IUser {
  _id: ObjectId;
  name: string;
  provider: string;
  bio?: string;
  url?: string;
  email: string;
  password: string;
  role: string;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  profileImage?: string;
  avatar_url?: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
