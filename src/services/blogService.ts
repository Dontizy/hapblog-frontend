import { api } from "../lib/api";
import type {
  BlogDetailResponse,
  BlogResponse,
  CreateBlog,
  CreateBlogResponse,
  DeleteBlogResponse,
  LikedBlogResponse
} from "../lib/blog";

// import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export interface getBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getBlogs = async ({
  page = 1,
  limit = 10,
  search = "",
}: getBlogsParams): Promise<BlogResponse> => {
  const res = await api.get<BlogResponse>(`/blog/posts`, {
    params: { page, limit, search },
  });
  return res.data;
};

export const getBlogById = async (id: string): Promise<BlogDetailResponse> => {
  const res = await api.get<BlogDetailResponse>(`/blog/post/${id}`);
  return res.data;
};

export const createBlogPost = async (
  blog: CreateBlog,
): Promise<CreateBlogResponse> => {
  const formData = new FormData();

  formData.append("title", blog.title);
  formData.append("content", blog.content);

  if (blog.imageUrl) {
    formData.append("image", blog.imageUrl);
  }
  const res = await api.post<CreateBlogResponse>("/blog/post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBlogPost = async(id:string): Promise<DeleteBlogResponse> =>{
    const res = await api.delete<DeleteBlogResponse>(`/blog/post/${id}`)
    return res.data
}

export const likeBlogPost = async (id:string): Promise<LikedBlogResponse> =>{
    const res = await api.patch<LikedBlogResponse>(`/blog/post/${id}/like`)
    return res.data
}

// {
//   "email":"ola@gmail.com",
//   "password":"123456"
// }
