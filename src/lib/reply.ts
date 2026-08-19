import type { Author } from "./Author";

export interface Reply {
  _id: string;
  author: Author;
  comment: string;
  likes: string[];
  body: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  isLiked: boolean;
  id: string;
}

export interface ReplyResponse {
  success: boolean;
  replies: Reply[];
  totalReplies: number;
  currentPage: number;
  totalPages: number;
}
export interface CreateReply {
  body: string;
}
export interface EditReplyResponse{
  success: boolean;
  message: string;
  reply: Reply;
}

export interface CreatedReply {
  _id: string;
  author: string;
  comment: string;
  likes: string[];
  body: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  id: string;
}

export interface createdReplyResponse {
  success: boolean;
  message: string;
  reply: CreatedReply;
}

export interface LikeReplyResponse {
  success: boolean;
  message: string;
}
