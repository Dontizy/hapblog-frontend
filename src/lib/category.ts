export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryListItemResponse{
      _id: string;
      name:string;
      slug: string;
      description: string;
}

export interface CategoryResponse{
  success: boolean,
  categories: CategoryListItemResponse[];
}

export interface CreateCategory{
  name: string;
  description: string;
}

export interface CreateCategoryResponse{
  success:boolean;
  message:string;
  category:Category;
}
