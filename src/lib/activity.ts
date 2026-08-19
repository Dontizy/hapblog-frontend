export type NotificationType =
  | "blog_like"
  | "comment"
  | "reply"
  | "reply_like"
  | "comment_like"
  | "follow"
  | "welcome"
  | "announcement"; // add this
export interface NotificationSender {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
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
  type: NotificationType;
  isRead: boolean;
  title?: string; // present for announcements
  message?: string;
  blog?: NotificationBlog;
  sender?: NotificationSender;
  comment?: NotificationComment;
  reply?: NotificationReply;
  announcementType?: string;
  unReadCount: number;
  createdAt: string;
  updatedAt: string;
}

// export interface Notification {
//   _id: string;
//   recipient: string;
//   sender: NotificationSender;
//   type: NotificationType;
//   blog?: NotificationBlog;
//   isRead: boolean;
//   comment?: NotificationComment;
//   reply?: NotificationReply;
//   unReadCount:number;
//   createdAt: string;
//   updatedAt: string;
// }


export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  unReadCount: number;
}


export interface MarkNotificationAsReadResponse {
  success: boolean;
  message: string;
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

export interface AddOrRemoveBookmarkResponse {
  success: boolean;
  message: string;
}

export interface BookmarksResponse {
  success: boolean;
  bookmarks: Bookmark[];
}

// and make sender + title/blog reflect reality per type, e.g.:
