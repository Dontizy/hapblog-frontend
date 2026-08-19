import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, deleteUserById, toggleAdminRole, suspendUserById, broadcastAnnouncement} from "../../services/adminService";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { toast } from "sonner";

import type { AdminUsersParams } from "../../lib/admin";
import { useSound } from "../useSound";
import { SOUND } from "../../lib/sound";

export const useAdminUsers = (params: AdminUsersParams) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAllUsers(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const playSuccess = useSound(SOUND.SUCCESS);
  const errorSound = useSound(SOUND.ERROR);
  return useMutation({
    mutationFn: deleteUserById,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
      playSuccess();
      toast.success(data.message);
    },
    onError: (e) => {
      errorSound()
      toast.error(getErrorMessage(e, "Couldn't delete user. Try again later"));
    },
  });
};


export const useToggleAdminRole = () => {
  const queryClient = useQueryClient();

  const playSuccess = useSound(SOUND.SUCCESS);
  const errorSound = useSound(SOUND.ERROR);

  return useMutation({
    mutationFn: toggleAdminRole,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      playSuccess();
      toast.success(data.message);
    },

    onError: (error) => {
      errorSound();
      toast.error(
        getErrorMessage(
          error,
          "Couldn't update admin role. Try again later",
        ),
      );
    },
  });
};

export const useSuspendUser = () => {
  const queryClient = useQueryClient();

  const playSuccess = useSound(SOUND.SUCCESS);
  const errorSound = useSound(SOUND.ERROR);

  return useMutation({
    mutationFn: suspendUserById,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      playSuccess();
      toast.success(data.message);
    },

    onError: (error) => {
      errorSound();

      toast.error(
        getErrorMessage(
          error,
          "Couldn't suspend user. Try again later",
        ),
      );
    },
  });
};


export const useBroadcastAnnouncement = () => {
  const playSuccess = useSound(SOUND.SUCCESS);
  const errorSound = useSound(SOUND.ERROR);

  return useMutation({
    mutationFn: broadcastAnnouncement,

    onSuccess: (data) => {
      playSuccess();
      toast.success(data.message);
    },

    onError: (error) => {
      errorSound();
      toast.error(
        getErrorMessage(
          error,
          "Couldn't send announcement. Try again later",
        ),
      );
    },
  });
};
