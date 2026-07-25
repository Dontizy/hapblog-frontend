export type UserRole = "user" | "admin";

export interface User {
  _id: string;

  name: string;
  email: string;

  role: UserRole;

  avatar?: string;
  bio?: string;

  followers: string[];
  following: string[];
  bookmarks: string[];

  createdAt: string;
  updatedAt: string;
}


export interface Login{
  email:string;
  password:string;
}

export interface LogingResponse{
  user:{
    id:string;
    name:string;
    email:string;
    role:UserRole;
    bio:string;
    avatar:string;
  },
  token:string;
  }

