import type { User } from "./user";
import type { Blog } from "./blog";
import type { Comment } from "./comment";
import type { Reply } from "./reply";

export type NotificationType =
  | "blog_like"
  | "comment"
  | "reply"
  | "reply_like"
  | "comment_like"
  | "follow";

export interface Notification {
  _id: string;

  recipient: User;
  sender: User;

  type: NotificationType;

  blog?: Blog;

  comment?: Comment;

  reply?: Reply;

  isRead: boolean;

  createdAt: string;
  updatedAt: string;
}
