export type UserRole = "user" | "admin";

export interface User {
  _id: string;

  name: string;
  email: string;

  role: UserRole;

  avatar?: string;
  bio?: string;

  followers: string[];
  following: string[];
  bookmarks: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ProfileResponse {
  user: {
    id: string;
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
