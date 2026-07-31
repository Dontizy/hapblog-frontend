import type { User } from "./user";

export const BLOG_CATEGORIES = [
  "Technology",
  "Programming",
  "AI",
  "Business",
  "Design",
  "Lifestyle",
  "Health",
  "Education",
  "Travel",
  "Sports",
  "Entertainment",
  "News",
  "Finance",
  "Food",
  "Politics",
  "Other",
] as const;

export type blogCategory = (typeof BLOG_CATEGORIES)[number];

export interface Blog {
  _id: string;

  title: string;
  content: string;
  imageUrl?: string;

  author: User;
  category:blogCategory;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  isLiked:boolean;
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

export interface CreateBlog{
    title:string;
    content:string;
    category:blogCategory;
    imageUrl?:File | null;
}

export interface CreateBlogResponse{
  success:boolean;
  blog:{
  _id: string;
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: string[];
  category:string;
  likesCount: number;
  isLiked:boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}
}

export interface DeleteBlogResponse{
  success:boolean;
  message:string;
}

export interface LikedBlogResponse{
  success:boolean;
  message:string;
}
