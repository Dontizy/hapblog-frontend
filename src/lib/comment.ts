import type { Author } from "./Author";


export interface Comment {
  _id: string;

  body: string;

  author: Author;

  blog: string;
  likes: string[];

  likedCommentCount: number;

  repliesCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse {
  success: boolean;
  comments: Comment[];
  totalComments: number;
  currentPage: number;
  totalPages: number;
}

export interface LikeCommentResponse {
  sucess: boolean;
  message: string;
}

export interface CreateComment {
  body: string;
}

export interface CreatedCommentResponse {
  success: boolean;
  message: string;
  comment: {
    _id: string;
    author: string;
    body: string;
    likes: string[];
    blog: string;
    createdAt: string;
    updatedAt: string;
    likedCommentCount: number;
    id: string;
  };
}
