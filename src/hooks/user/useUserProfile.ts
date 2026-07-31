import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getUserProfile, getPublicUserProfile, toggleFollowUser } from "../../services/userService"
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/getErrorMessage";


export const useUserProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    enabled: isAuthenticated, // don't fetch until we know there's a token
  });
};

export const usePublicProfile =(id:string)=>{
 return useQuery({
  queryKey:["public-profile", id],
  queryFn:()=>getPublicUserProfile(id),
  enabled:!!id,
 })
}

export const useToggleFollowUser =()=>{
  const queryClient = useQueryClient()

  return useMutation({
      mutationFn:toggleFollowUser,
      onSuccess:(data, id)=>{
        queryClient.invalidateQueries({queryKey:["public-profile", id]})
        queryClient.invalidateQueries({queryKey:["profile"]})
         toast.success(data.message);
      },
       onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Couldn't update follow status. Please try again.",
        ),
      );
    }
  })
}
