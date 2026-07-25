import type { User } from "./user";
import type { Comment } from "./comment";

export interface Reply {
  _id: string;

  body: string;

  author: User;

  comment: string | Comment;

  likes: string[];

  likesCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface ReplyDto {
  body: string;
}

// export interface UpdateReplyDto {
//   body: string;
// }
