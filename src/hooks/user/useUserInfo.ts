import {
  // useMutation,
  //  useQueryClient,
    useQuery } from "@tanstack/react-query";
import { getMyFollowers, getPublicFollowers, getMyFollowing, getPublicFollowing } from "../../services/userService";

export const useGetUserFollowers = () => {
  return useQuery({
    queryKey: ["followers"],
    queryFn: getMyFollowers,
  });
};

export const useGetPublicFollowers = (username: string, enabled=true) => {
  return useQuery({
    queryKey: ["followers", username],
    queryFn: () => getPublicFollowers(username),
    enabled: !!username && enabled,
  });
};


export const useGetUserFollowing = () => {
  return useQuery({
    queryKey: ["followers"],
    queryFn: getMyFollowing,
  });
};

export const useGetPublicFollowing = (username: string, enabled = true) => {
  return useQuery({
    queryKey: ["followings", username],
    queryFn: () => getPublicFollowing(username),
    enabled: !!username && enabled,
  });
};
