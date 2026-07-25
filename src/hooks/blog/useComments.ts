import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/commentService";

export const useComments = (blogId: string) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => getComments(blogId),
    enabled: !!blogId,
  });
};
