import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../services/activityService";

export const useNotification = () => {
  return useQuery({
     queryKey:["notification"],
     queryFn:getNotification
  });
};


