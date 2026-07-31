import { useMutation } from "@tanstack/react-query";
import {loginUser} from "../../services/userService";
import { getErrorMessage } from "../../lib/getErrorMessage";
import {toast} from "sonner"



export const useLoginUser = () => {
return useMutation({
  mutationFn: loginUser,
  onSuccess: (data) => {
    localStorage.setItem("token", data.token);
  },
  onError: (error) => {
    console.error("Login failed:", error);
    toast.error(getErrorMessage(error, "Login failed"))
  }
})

}
