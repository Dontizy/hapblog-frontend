import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../../services/activityService";

export const useBookmarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });
};
