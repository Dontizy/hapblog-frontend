import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getBookmarks, addOrRemoveBlogFromBookmark } from "../../services/activityService";
import { SOUND } from "../../lib/sound";
import { useSound } from "../useSound"
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/getErrorMessage";

export const useBookmarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });
};

export const useAddOrRemoveBookmark = () => {
  const queryClient = useQueryClient();
  const PlayErrorSound = useSound(SOUND.ERROR);
 

  return useMutation({
    mutationFn:(blogId:string) =>addOrRemoveBlogFromBookmark(blogId),

    onSuccess: (data, blogId) => {
      queryClient.invalidateQueries({
        queryKey: ["blog", blogId],
      });
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
      toast.success(data.message);
    },
    onError:(error)=>{
      PlayErrorSound();
      toast.error(getErrorMessage(error,"Couldn't add to bookmark. Please try again."), {icon: "❌"});
    }
}
  )}



