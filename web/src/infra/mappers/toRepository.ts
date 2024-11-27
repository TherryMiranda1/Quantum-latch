import { Repository } from "@/types/Repository";

export const toRepository = (repository: any): Repository => {
  return {
    githubId: repository.id,
    title: repository.name,
    description: repository.description,
    url: repository.html_url,
    isPublic: !repository.private,
  };
};
