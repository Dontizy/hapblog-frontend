import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBlogPost } from "../../services/blogService"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../lib/getErrorMessage"
import { SOUND } from "../../lib/sound"
import { useSound } from "../useSound"


export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const postSuccessSound = useSound(SOUND.POST)

  return useMutation({
        mutationFn:deleteBlogPost,
        onSuccess() {
          queryClient.invalidateQueries({ queryKey:["blogs"]})
          toast.success("Post deleted")
          navigate("/feeds")
          postSuccessSound()
        },
        onError(error){
          toast.error(getErrorMessage(error, "Couldn't delete this post. Try again later"))
        }
  })
}

