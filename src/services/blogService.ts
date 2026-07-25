import { api } from "../lib/api";
import type { BlogDetailResponse, BlogResponse } from "../lib/blog";

// import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export interface getBlogsParams{
  page?:number,
  limit?:number,
  search?:string
}

export const getBlogs = async ({
  page = 1,
  limit = 10,
  search = "",
}:getBlogsParams): Promise<BlogResponse> => {
  const res = await api.get<BlogResponse>(`/blog/posts`, { params: { page, limit, search } });
  return res.data;
};

export const getBlogById = async (id: string): Promise<BlogDetailResponse> => {
  const res = await api.get<BlogDetailResponse>(`/blog/post/${id}`);
  return res.data
}
