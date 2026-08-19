// hooks/auth/useRegister.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser } from "../../services/userService"; // adjust path if you split this into authService.ts
import { useAuthStore } from "../../store/useAuthStore";
import { getErrorMessage } from "../../lib/getErrorMessage";
import type { RegisterResponse } from "../../lib/user";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data: RegisterResponse) => {
      login(data.token);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(data.message ?? "Account created");
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Couldn't create your account. Please try again."),
      );
    },
  });
};
