import type { Author } from "./Author";
import type { blogCategory } from "./category";

export interface Blog {
  _id: string;

  title: string;
  content: string;
  imageUrl?: string;
  author: Author;

  category: blogCategory;
  status: "draft" | "published";
  likes: string[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  readingTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogDetailResponse {
  blog: Blog;
  success: boolean;
}

export interface BlogResponse {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
}

export interface CreateBlog {
  title: string;
  content: string;
  category: blogCategory;
  status: "draft" | "published";
  image?: File | null;
}

export interface CreateBlogResponse {
  success: boolean;
  blog: {
    _id: string;
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    likes: string[];
    category: string;
    likesCount: number;
    isLiked: boolean;
    author: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DeleteBlogResponse {
  success: boolean;
  message: string;
}

export interface LikedBlogResponse {
  success: boolean;
  message: string;
}

export interface UpdateBlog {
  title?: string;
  content?: string;
  status: "draft" | "published";
  category?: blogCategory;
  image?: File | null;
}

export interface UpdateBlogResponse {
  success: boolean;
  blog: {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    likes: string[];
    author: string;
    category: blogCategory;
    createdAt: string;
    updatedAt: string;
    likesCount: number;
    id: string;
  };
}

// export interface Post {
//   _id: string;
//   id: string;
//   title: string;
//   content: string;
//   likes: string[];
//   status: "published" | "draft";
//   author: Author;
//   category: string;
//   createdAt: string;
//   updatedAt: string;
//   likesCount: number;
// }

export interface PaginationData {
  totalPosts: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserBlogResponse {
  success: boolean;
  data: {
    posts: Blog[];
    pagination: PaginationData;
  };
}
export interface GetPublicUserPostsParams {
  userId: string;
  page?: number;
  limit?: number;
}
export interface UserPostsParams {
  page?: number;
  limit?: number;
}

export interface DraftResponse {
  success: boolean;
  drafts: Blog[];
  currentPage: number;
  totalPages: number;
  totalDrafts: number;
  limit: number;
}
export interface PublishDraftResponse {
  success: boolean;
  message: string;
  blog: Blog[];
}

export interface SearchAuthorsResponse {
  success: boolean;
  authors: Author[];
  currentPage: number;
  totalPages: number;
  totalAuthors: number;
  limit: number;
}
