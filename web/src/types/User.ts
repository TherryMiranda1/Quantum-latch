export enum UserRoles {
  USER = "user",
  PREMIUM_USER = "premium-user",
  MODERATOR = "moderator",
  ADMIN = "admin",
}

export interface User {
    _id: string;
    userUUID: string;
    provider: string;
    email: string;
    role: string;
    name?: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  