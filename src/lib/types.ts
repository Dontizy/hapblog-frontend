// Shared domain types mirroring the blog API resources.

export interface User {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  role: 'admin' | 'user'
  joinedAt: string
  followers: number
  following: number
}

export interface Blog {
  _id: string;

  title: string;
  content: string;
  imageUrl?: string;

  author: string;

  likes: string[];

  likesCount: number;
  commentsCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  body: string
  createdAt: string
  likeCount: number
  liked: boolean
  replies: Reply[]
}

export interface Reply {
  id: string
  commentId: string
  authorId: string
  body: string
  createdAt: string
}

export type NotificationType = 'like' | 'comment' | 'reply' | 'follow' | 'mention'

export interface AppNotification {
  id: string
  type: NotificationType
  actorId: string
  postId?: string
  text: string
  createdAt: string
  read: boolean
}
