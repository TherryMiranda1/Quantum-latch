export interface Repository {
    _id?: string;
    githubId: string;
    ownerId: string;
    title: string;
    url?: string;
    description?: string;
    isPublic?: boolean;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  