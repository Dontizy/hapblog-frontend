import type { User } from "./user";

export interface AdminUsersResponse {
  success: boolean;
  users: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  limit: number;
}

export interface AdminUsersParams {
  search?: string;
  month?: string; // "1"-"12"
  year?: string; // "2026"
  page?: number;
}
