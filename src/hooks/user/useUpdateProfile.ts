import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  updateBio,
  uploadAvatar,
} from "../../services/userService";
import { toast } from "sonner";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { useNavigate } from "react-router-dom";

export const useUpdateBio = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateBio,
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Bio updated");
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Couldn't update your bio. Try again."),
      );
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile photo updated");
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Couldn't update your profile photo. Try again.",
        ),
      );
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Password updated successfully.")
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Couldn't update your password. Please try again.",
        ),
      );
    },
  });
};
