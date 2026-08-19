import { api } from "../lib/api"; // <-- adjust this import to match userService.ts
import type { AdminUsersParams, AdminUsersResponse } from "../lib/admin";

type resPonseOk = {
  success: boolean;
  message: string;
};
export const getAllUsers = async (
  params: AdminUsersParams,
): Promise<AdminUsersResponse> => {
  const { data } = await api.get("/user/admin/users", { params });
  return data;
};

export const deleteUserById = async (id: string): Promise<resPonseOk> => {
  const { data } = await api.delete<resPonseOk>(`/user/auth/delete/${id}`);
  return data;
};

export const toggleAdminRole = async (id: string): Promise<resPonseOk> => {
  const { data } = await api.patch<resPonseOk>(`/user/auth/admin/${id}`);
  return data;
};

export const suspendUserById = async ({
  id,
  days,
}: {
  id: string;
  days: number;
}): Promise<{ message: string; success: boolean; suspendedUntil: string }> => {
  const { data } = await api.patch<{
    message: string;
    success: boolean;
    suspendedUntil: string;
  }>(`/user/admin/${id}/suspend`, { days });
  return data;
};

export const broadcastAnnouncement = async ({
  title,
  message,
}: {
  title: string;
  message: string;
}): Promise<{ message: string; success: boolean; recpientCount: number }> => {
  const { data } = await api.post<{
    message: string;
    success: boolean;
    recpientCount: number;
  }>("/user/admin/broadcast", {
    title,
    message,
  });
  return data;
};
