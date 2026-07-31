import axios from "axios";

interface ApiError {
  success: boolean;
  message: string;
}

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong."
) {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
