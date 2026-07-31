import { useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { getBlogById, likeBlogPost } from "../../services/blogService";

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });
};



export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeBlogPost,

    onSuccess: (data, blogId) => {
      queryClient.invalidateQueries({
        queryKey: ["blog", blogId],
      });

      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Couldn't update like. Please try again."
        )
      );
    },
  });
};
