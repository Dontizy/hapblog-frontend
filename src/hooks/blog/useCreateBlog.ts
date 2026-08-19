import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogPost } from "../../services/blogService";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { SOUND } from "../../lib/sound";
import { useSound } from "../useSound";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const postSuccessSound = useSound(SOUND.POST)
  const postErrorSound = useSound(SOUND.ERROR)

  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      postSuccessSound()
    },
    onError:(e)=>{
       toast.error(getErrorMessage(e, "Couldn't publish your post. Try again."))
        postErrorSound()
    }
  });
};
