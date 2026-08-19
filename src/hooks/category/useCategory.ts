import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getCategories, createCategory} from "../../services/categoryService";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { SOUND } from "../../lib/sound";
import { useSound } from "../useSound";
import { toast } from "sonner";


export const useGetCategories =()=>{

return useQuery({
  queryKey:["categories"],
  queryFn:getCategories,
  staleTime: 10 * 60 * 1000,
})
}

export const useCreateCategory =()=>{
  const playSuccess = useSound(SOUND.SUCCESS)
  const playError = useSound(SOUND.ERROR)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn:createCategory,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({ queryKey:["categories"]})
      playSuccess()
      toast.success(data.message)
    },
    onError:(e)=>{
      playError()
      toast.error(getErrorMessage(e, "Couldn't add category. Try again later."))
    }
  })
}
