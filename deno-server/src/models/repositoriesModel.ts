export interface IRepository {
  _id?: string;
  githubId: string;
  ownerId: string;
  title: string;
  description?: string;
  isPublic?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
