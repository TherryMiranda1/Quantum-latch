import { Repository } from "@/types/Repository";
import { User } from "@/types/User";

export interface OriginalImageType {
  title: string;
  content: any;
}

export interface AuthFormUserType {
  email: string;
  password: string;
  name?: string;
}

export interface GlobalReturnType {
  user: UserOptions;
  repositories: RepositoriesOptions;
  ui: UIOptions;
}

export interface UserOptions {
  currentUser: User | null;
  isMember: boolean;
  isUserLoaded: boolean;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  getUserInfo: () => Promise<any>;
  loginUser: (draft: AuthFormUserType) => Promise<any>;
  registerUser: (draft: AuthFormUserType) => Promise<any>;
  setToken: (token: string | null) => void;
}
export interface RepositoriesOptions {
  userRepositories: {
    data: Repository[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
    reset: () => void;
    call: (options?: any) => void;
    callWithReturn: (options?: any) => Promise<any>;
  };
  linkedRepositories: {
    data: Repository[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
    reset: () => void;
    call: (options?: any) => void;
    callWithReturn: (options?: any) => Promise<any>;
  };
}

export interface UIOptions {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

export enum FeedbackType {
  CONTENT = "content",
  EXPERIENCE = "experience",
  TECH = "tech",
  OTHERS = "others",
}
