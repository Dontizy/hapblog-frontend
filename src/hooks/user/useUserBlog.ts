import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  publicUserBlogPost,
  getDraft,
  type queryParams,
  publishDraft,
  getUserBlogPost
} from "../../services/blogService";
import { toast } from "sonner";
import { useSound } from "../useSound";
import { SOUND } from "../../lib/sound";
import { getErrorMessage } from "../../lib/getErrorMessage";

export const useGetPublicBlogPost = (
  userId: string,
  enabled: boolean = true,
) => {
  return useInfiniteQuery({
    queryKey: ["public-user-post", userId],

    queryFn: ({ pageParam }) =>
      publicUserBlogPost({
        userId,
        page: pageParam,
        limit: 10,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;

      if (page >= totalPages) {
        return undefined;
      }

      return page + 1;
    },

    enabled: !!userId && enabled,
  });
};

export const useGetDraft = ({
  limit = 10,
  page = 1,
  search = "",
}: queryParams) => {
  return useQuery({
    queryKey: ["drafts", { limit, search, page }],
    queryFn: () => getDraft({ limit, search, page }),
    placeholderData: keepPreviousData,
  });
};

export const usePublishDraft = () => {
  const queryClient = useQueryClient();
  const playSuccess = useSound(SOUND.SUCCESS);
  const playError = useSound(SOUND.ERROR);
  return useMutation({
    mutationFn: ({ id }: { id: string }) => publishDraft(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      // queryClient.invalidateQueries({ queryKey:["my-posts"]})
      playSuccess();
      toast.success(data.message);
    },
    onError: (e) => {
      playError();
      toast.error(
        getErrorMessage(e, "Couldn't publish this post. Try again later"),
      );
    },
  });
};

export const useGetUserBlogPost = () => {
  return useInfiniteQuery({
    queryKey: ["user-posts"],

    queryFn: ({ pageParam }) =>
      getUserBlogPost({
        page: pageParam,
        limit: 10,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;

      if (page >= totalPages) {
        return undefined;
      }

      return page + 1;
    },
  });
};
