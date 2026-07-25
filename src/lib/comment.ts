import type { User } from "./user";
import type { Blog } from "./blog";
import type { Reply } from "./reply";


export interface Comment {
  _id: string;

  body: string;

  author: User;

  blog: string | Blog;

  likes: string[];

  likedCommentCount: number;

  repliesCount: number;

  replies?: Reply[];

  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse {
  success: boolean,
  comments: Comment[],
  totalComments:number,
  currentPage: number,
  totalPages: number
}
