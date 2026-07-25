import { api } from "../lib/api";
import type { Login } from "../lib/user";


export const loginUser = async (user: Login): Promise<Login> => {
  const res = await api.post("/user/login", user);
  return res.data;
};
