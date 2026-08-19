import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotification, markNotification } from "../../services/activityService";

export const useNotification = () => {
  return useQuery({
     queryKey:["notifications"],
     queryFn:getNotification
  });
};

export const useMarkNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
     mutationFn:(id:string)=>markNotification(id),
     onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["notifications"]})
     }
  });
};


