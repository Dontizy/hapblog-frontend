import type { User } from "./user";

export interface Blog {
  _id: string;

  title: string;
  content: string;
  imageUrl?: string;

  author: User;

  likes: string[];

  likesCount: number;
  commentsCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface BlogDetailResponse{
  blog: Blog;
  success: boolean;
}

export interface BlogResponse {
  success: boolean;
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
}
