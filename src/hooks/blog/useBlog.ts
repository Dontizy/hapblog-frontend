import { useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { getBlogBySlug, likeBlogPost, updateBlog } from "../../services/blogService";
import type { UpdateBlog } from "../../lib/blog";


export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
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


export const useUpdateBlog = ()=>{
  const queryClient = useQueryClient()

  return useMutation({
      mutationFn:({id, blog}:{ id:string, blog:UpdateBlog})=>updateBlog(id, blog),
      onSuccess:(_, variables)=>{
        queryClient.invalidateQueries({ queryKey:["blogs"]})
        queryClient.invalidateQueries({ queryKey:["blog", variables.id]})

      },
      onError:(error)=>{
        toast.error(getErrorMessage(error, "Couldn't update post. Please try again"))
      }
  })
}
