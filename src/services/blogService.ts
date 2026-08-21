import { api } from "../lib/api";
import type {
  BlogDetailResponse,
  BlogResponse,
  CreateBlog,
  CreateBlogResponse,
  DeleteBlogResponse,
  LikedBlogResponse,
  UpdateBlog,
  UpdateBlogResponse,
  DraftResponse,
  SearchAuthorsResponse,
  PublishDraftResponse,
  UserBlogResponse,
  GetPublicUserPostsParams,
  UserPostsParams
} from "../lib/blog";


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

export const getBlogBySlug = async (slug: string): Promise<BlogDetailResponse> => {
  const res = await api.get<BlogDetailResponse>(`/blog/post/${slug}`);
  return res.data;
};

export const createBlogPost = async (
  blog: CreateBlog,
): Promise<CreateBlogResponse> => {
  const formData = new FormData();

  formData.append("title", blog.title);
  formData.append("content", blog.content);
  formData.append("status", blog.status);
  formData.append("category", blog.category);

  if (blog.image) {
    formData.append("image", blog.image);
  }
  const res = await api.post<CreateBlogResponse>("/blog/post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBlogPost = async (
  id: string,
): Promise<DeleteBlogResponse> => {
  const res = await api.delete<DeleteBlogResponse>(`/blog/post/${id}`);
  return res.data;
};

export const updateBlog = async (
  id: string,
  blog: UpdateBlog,
): Promise<UpdateBlogResponse> => {
  const formData = new FormData();
  if (blog.title) {
    formData.append("title", blog.title);
  }
  if (blog.category) {
    formData.append("category", blog.category);
  }
  if (blog.content) {
    formData.append("content", blog.content);
  }
  formData.append("status", blog.status);
  if (blog.image) {
    formData.append("image", blog.image);
  }
  const res = await api.put<UpdateBlogResponse>(`/blog/post/${id}`, formData);
  return res.data;
};

export const likeBlogPost = async (id: string): Promise<LikedBlogResponse> => {
  const res = await api.patch<LikedBlogResponse>(`/blog/post/${id}/like`);
  return res.data;
};


export const publicUserBlogPost = async ({userId, page = 1, limit = 10}:GetPublicUserPostsParams): Promise <UserBlogResponse> =>{
   const res = await api.get<UserBlogResponse>(`/user/posts/public/${userId}
`,{ params:{page, limit }})
   return res.data
}

export const getUserBlogPost = async ({page = 1, limit = 10}:UserPostsParams): Promise <UserBlogResponse> =>{
   const res = await api.get<UserBlogResponse>(`/user/my-posts
`,{ params:{page, limit }})
   return res.data
}

export type queryParams ={
  limit?:number;
  page?:number;
  search?:string;
}
export const getDraft = async({limit = 10, page = 1, search = ""}:queryParams): Promise<DraftResponse>=>{
  const res = await api.get<DraftResponse>('/user/blog/drafts',{
    params:{limit, page, search}
  })
  return res.data
}

export interface SearchAuthorsParams {
  search: string;
  page?: number;
  limit?: number;
}

export const fetchAuthors = async ({
  search,
  page = 1,
  limit = 10,
}: SearchAuthorsParams): Promise<SearchAuthorsResponse> => {
  const response = await api.get<SearchAuthorsResponse>(
    "/users/authors/search",
    { params: { search, page, limit } }
  );
  return response.data;
};


export const publishDraft = async (id:string): Promise<PublishDraftResponse>=>{
  const res = await api.patch<PublishDraftResponse>(`/blog/post/${id}/publish`)
  return res.data
}
