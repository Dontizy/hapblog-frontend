import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SOUND } from "../../lib/sound";
import { useSound } from "../useSound";
import {
  getComments,
  createComment,
  getReplies,
  likeComment,
  likeReply,
  createReplyComment,
  deleteComment,
  deleteReply,
  editReply,
  type EditReplyPayload,
  editComment,
  type EditCommentPayload
} from "../../services/commentService";
import type { CreateComment } from "../../lib/comment";
import type { CreateReply } from "../../lib/reply";
import { getErrorMessage } from "../../lib/getErrorMessage";

export const useComments = (blogId: string) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getComments(blogId),
    enabled: !!blogId,
  });
};

export const useReplies = (commentId: string, enabled = true) => {
  return useQuery({
    queryKey: ["replies", commentId],
    queryFn: () => getReplies(commentId),
    enabled,
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  const playErrorSound = useSound(SOUND.ERROR);

  return useMutation({
    mutationFn: ({
      blogId,
      commentId,
    }: {
      blogId: string;
      commentId: string;
    }) => likeComment(blogId, commentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.blogId],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      playErrorSound();
      toast.error(getErrorMessage(error, "Couldn't like comment"));
    },
  });
};

export const useLikeReply = () => {
  const playErrorSound = useSound(SOUND.ERROR);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      replyId,
    }: {
      commentId: string;
      replyId: string;
    }) => likeReply(commentId, replyId),
    onSuccess: (data, varibles) => {
      queryClient.invalidateQueries({
        queryKey: ["replies", varibles.commentId],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Couldn't like reply"));
      playErrorSound();
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const playCommentSound = useSound(SOUND.COMMENT);
  const playErrorSound = useSound(SOUND.ERROR);

  return useMutation({
    mutationFn: ({
      blogId,
      comment,
    }: {
      blogId: string;
      comment: CreateComment;
    }) => createComment(blogId, comment),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.blogId],
      });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.blogId] });
      playCommentSound();
      toast.success(data.message);
    },
    onError: (error) => {
      playErrorSound();
      toast.error(getErrorMessage(error, "Couldn't post comment"));
    },
  });
};

interface CreateReplyVariables {
  blogId: string;
  commentId: string;
  reply: CreateReply;
}

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  const playCommentSound = useSound(SOUND.SUCCESS);
  const playErrorSound = useSound(SOUND.ERROR);

  return useMutation({
    mutationFn: (variable: CreateReplyVariables) =>
      createReplyComment(variable.commentId, variable.reply),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["replies", variables.commentId],
      });

      queryClient.invalidateQueries({
        queryKey: ["comments", variables.blogId],
      });
      playCommentSound();
      toast.success(data.message);
    },

    onError: (error) => {
      playErrorSound();
      toast.error(getErrorMessage(error, "Couldn't post your reply"));
    },
  });
};

export const useDeleteComment =()=>{
  const successSound = useSound(SOUND.SUCCESS)
  const playErrorSound = useSound(SOUND.ERROR);
  const queryClient = useQueryClient()

  return useMutation({
  mutationFn:({postId, commentId}:{ postId:string, commentId:string})=>deleteComment(postId, commentId),
    onSuccess:(data, variables)=>{
      queryClient.invalidateQueries({ queryKey:["comments", variables.postId]})
      queryClient.invalidateQueries({ queryKey:["blog", variables.postId]})
      successSound()
      toast.success(data.message)
    },
    onError:(e)=>{
      playErrorSound();
      toast.error(getErrorMessage(e, "Couldn't delete this comment"))
    }
  })

}

export const useDeleteReply = () =>{
const successSound = useSound(SOUND.SUCCESS)
const playErrorSound = useSound(SOUND.ERROR);
const queryClient = useQueryClient()

  return useMutation({
  mutationFn:({commentId, replyId}:{ commentId:string, replyId:string})=>deleteReply(commentId, replyId),
    onSuccess:(data, variables)=>{
      queryClient.invalidateQueries({ queryKey:["replies", variables.commentId]})
      queryClient.invalidateQueries({ queryKey:["comments"]})
      successSound()
      toast.success(data.message)
    },
    onError:(e)=>{
      playErrorSound()
      toast.error(getErrorMessage(e, "Couldn't delete this reply"))
    }
  })
}

export const useEditComment = () => {
  const queryClient = useQueryClient();
  const playErrorSound = useSound(SOUND.ERROR);
  const successSound = useSound(SOUND.SUCCESS)

  return useMutation({
    mutationFn: ({ postId, commentId, body }: EditCommentPayload) =>
      editComment({ postId, commentId, body }),

    onSuccess: (_data, variables) => {
      // Invalidate the post's comments to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      successSound()
      toast.success("Comment updated");
    },

    onError: (e) => {
      playErrorSound()
      toast.error(getErrorMessage(e, "Failed to update comment"));
    },
  });
};


export const useReplyEdit = () => {
  const queryClient = useQueryClient();
  const playErrorSound = useSound(SOUND.ERROR);
  const successSound = useSound(SOUND.SUCCESS)

  return useMutation({
    mutationFn: ({commentId, replyId, body }: EditReplyPayload) =>
      editReply({commentId, replyId,  body }),

    onSuccess: (data, variables) => {
      // Invalidate the post's comments to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.commentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["replies"],
      });
      successSound()
      toast.success(data.message);
    },

    onError: (e) => {
      playErrorSound()
      toast.error(getErrorMessage(e, "Failed to update comment"));
    },
  });
};
