import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { searchAuthors } from "../../services/userService";
import type { SearchAuthorsParams } from "../../lib/user";




export const useSearchAuthors = ({ search, page = 1, limit = 20 }: SearchAuthorsParams) => {
  return useQuery({
    queryKey: ["searchAuthors", { search, page, limit }],
    queryFn: () => searchAuthors({ search, page, limit }),
    enabled: search.trim().length > 0, // matches the controller's own short-circuit on empty search
    placeholderData: keepPreviousData,
  });
};
