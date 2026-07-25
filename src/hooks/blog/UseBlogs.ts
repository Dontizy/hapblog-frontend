import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/blogService";
import type { getBlogsParams } from "../../services/blogService";

export const useBlogs = (params: getBlogsParams) => {
  return useQuery({
    queryKey: ["blogs", params.page, params.limit, params.search],
    queryFn: () => getBlogs(params),
    placeholderData: (previousData) => previousData,
  });
};
