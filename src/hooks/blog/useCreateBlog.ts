import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogPost } from "../../services/blogService";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/getErrorMessage";


export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Post published")
    },
    onError:(e)=>{
        toast.error(getErrorMessage(e, "Couldn't publish your post. Try again."))
    }
  });
};
