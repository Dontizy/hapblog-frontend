export type UserRole = "user" | "admin";
import type { Author } from "./Author";

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  bookmarks: string[];
  followers: string[];
  following: string[];
  suspendedUntil?: string;
  createdAt: string;
  updatedAt: string;
}


export interface Login {
  identifier: string;
  password: string;
}

export interface ProfileResponse {
  user: {
    id: string;
    username:string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    role: UserRole;
    followers: string[];
    following: string[];
    bookmarks: string[];
    blogsCount: number;
    bookmarksCount: number;
    followersCount: number;
    followingCount: number;
  };
  success: boolean;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    bio: string;
    avatar: string;
  };
  token: string;
}

export interface UploadAvatar {
  avatar: File;
}
export interface UploadAvatarResponse {
  success: boolean;
  user: User;
}

export interface ChangePassword {
  newPassword: string;
  oldPassword: string;
}
export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface UpdateBio {
  bio: string;
}
export interface UpdateBioResponse {
  success: boolean;
  bio: string;
}

export interface PublicUserResponse {
  success: boolean;
  user: {
    _id:string;
    username:string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    followersCount: number;
    followingCount: number;
  };
  isFollowing: boolean;
  blogsCount: number;
}

export interface FollowUnFollowUserResponse {
  success: boolean;
  message: string;
}


export interface FollowersResponse{
  success: boolean;
  followers: [
    {
      _id: string;
      username: string
      name:string;
      avatar: string;
      bio: string;
      isFollowing: boolean
    }
  ]
}
export interface FollowingResponse{
  success: boolean;
  following: [
    {
      _id: string;
      username: string
      name:string
      avatar: string;
      bio: string;
      isFollowingBack: boolean
    }
  ]
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}


export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    role:UserRole;
  };
}

export interface ForgotPassword {
  identifier: string;
}
export interface ForgotPasswordResponse{
   success:boolean;
   message: string;
}


export interface ResetPassword {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}


export interface SearchAuthorsResponse {
  success: boolean;
  authors: Author[];
  currentPage: number;
  totalPages: number;
  totalAuthors: number;
  limit: number;
}

export interface SearchAuthorsParams {
  search: string;
  page?: number;
  limit?: number;
}


