import { api } from "../lib/api";
import type {
  CommentResponse,
  CreateComment,
  LikeCommentResponse,
  CreatedCommentResponse,
} from "../lib/comment";
import type {
  ReplyResponse,
  CreateReply,
  LikeReplyResponse,
  createdReplyResponse,
  EditReplyResponse
} from "../lib/reply";

export const getComments = async (blogId: string): Promise<CommentResponse> => {
  const res = await api.get<CommentResponse>(`/blog/post/${blogId}/comments`);
  return res.data;
};
export const createComment = async (
  blogId: string,
  comment: CreateComment,
): Promise<CreatedCommentResponse> => {
  const res = await api.post<CreatedCommentResponse>(
    `/blog/post/${blogId}/comment`,
    comment,
  );
  return res.data;
};


export const deleteComment = async (postId:string, commentId:string): Promise<{ success: boolean; message: string }> => {
   const res = await api.delete<{ success: boolean; message: string }>(`/blog/${postId}/comment/${commentId}`)
   return res.data
};

export const likeComment = async (
  blogId: string,
  commentId: string,
): Promise<LikeCommentResponse> => {
  const res = await api.patch<LikeCommentResponse>(
    `/blog/${blogId}/comment/${commentId}/like`,
  );
  return res.data;
};

// Replies
export const likeReply = async (
  commentId: string,
  replyId: string,
): Promise<LikeReplyResponse> => {
  const res = await api.patch<LikeReplyResponse>(
    `/blog/comment/${commentId}/reply/${replyId}/like`,
  );
  return res.data;
};

export const getReplies = async (commentId: string): Promise<ReplyResponse> => {
  const res = await api.get<ReplyResponse>(
    `/blog/comment/${commentId}/replies`,
  );
  return res.data;
};

export const createReplyComment = async (
  commentId: string,
  reply: CreateReply,
): Promise<createdReplyResponse> => {
  const res = await api.post<createdReplyResponse>(
    `/blog/comment/${commentId}/reply`,
    reply,
  );
  return res.data;
};

export const deleteReply = async (commentId:string, replyId:string): Promise<{ success: boolean; message: string }> => {
   const res = await api.delete<{ success: boolean; message: string }>(`/blog/comment/${commentId}/reply/${replyId}`)
   return res.data
};

export interface EditCommentPayload {
  postId: string;
  commentId: string;
  body: string;
}

export const editComment = async ({
  postId,
  commentId,
  body,
}: EditCommentPayload): Promise<{ success: boolean; message: string; comment: Comment }> => {
  const res = await api.patch<{ success: boolean; message: string; comment: Comment }>(
    `/blog/${postId}/comment/${commentId}`,
    { body }
  );
  return res.data;
};

export interface EditReplyPayload {
  commentId: string;
  replyId: string;
  body: string;
}

export const editReply = async ({
  commentId,
  replyId,
  body,
}: EditReplyPayload): Promise<EditReplyResponse> => {
  const res = await api.patch<EditReplyResponse>(
    `/blog/comment/${commentId}/reply/${replyId}`,
    { body }
  );
  return res.data;
};
