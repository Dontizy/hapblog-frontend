import { useMutation } from "@tanstack/react-query";
import { forgotPassword, resetPassword} from "../../services/userService";
import { toast } from "sonner";
import { useSound } from "../useSound";
import { SOUND } from "../../lib/sound";
import { getErrorMessage } from "../../lib/getErrorMessage";

export const useForgottenPassword =()=>{
  const playSuccess = useSound(SOUND.SUCCESS)
  const playError = useSound(SOUND.ERROR)

  return useMutation({
    mutationFn:forgotPassword,
    onSuccess:(data)=>{
      playSuccess()
      toast.success(data.message)
    },
    onError:(e)=>{
      playError()
    toast.error(getErrorMessage(e, "Email not sent. Try again later"))
    }
  })
}


export const useResetPassword = () => {
  const playSuccess = useSound(SOUND.SUCCESS);
  const playError = useSound(SOUND.ERROR);

  return useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      playSuccess();
      toast.success(data.message);
    },

    onError: (error) => {
      playError();

      toast.error(
        getErrorMessage(
          error,
          "Unable to reset your password. Please try again."
        )
      );
    },
  });
};
