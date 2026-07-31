export type NotificationType =
  | "blog_like"
  | "comment"
  | "reply"
  | "reply_like"
  | "comment_like"
  | "follow";

export interface NotificationSender {
  _id: string;
  name: string;
  avatar: string;
}

export interface NotificationBlog {
  _id: string;
  id: string;
  title: string;
  likesCount: number;
}

export interface NotificationComment {
  _id: string;
  content?: string;
}

export interface NotificationReply {
  _id: string;
  content?: string;
}

export interface Notification {
  _id: string;
  recipient: string;
  sender: NotificationSender;
  type: NotificationType;
  blog?: NotificationBlog;
  comment?: NotificationComment;
  reply?: NotificationReply;
  isRead: boolean;
  unReadCount:number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  unReadCount: number;
}

export interface BookmarkAuthor {
  _id: string;
  name: string;
  email: string;
}

export interface Bookmark {
  _id: string;
  title: string;
  content: string;
  likes: string[]; // Array of user IDs
  author: BookmarkAuthor;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  id: string;
}

export interface BookmarksResponse {
  success: boolean;
  bookmarks: Bookmark[];
}
