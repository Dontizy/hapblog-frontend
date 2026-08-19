import { api } from "../lib/api";
import type {  CategoryResponse, CreateCategory, CreateCategoryResponse } from "../lib/category";



export const createCategory = async(category:CreateCategory): Promise<CreateCategoryResponse> =>{
  const res = await api.post<CreateCategoryResponse>("/blog/create-category", category)
  return res.data
}

export const getCategories = async(): Promise<CategoryResponse> =>{
        const res = await api.get<CategoryResponse>("/blog/get-category")
        return res.data
}
