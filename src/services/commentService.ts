import { api } from "../lib/api";
import type {CommentResponse} from "../lib/comment";


export const getComments = async (blogId:string): Promise<CommentResponse> =>{
 const res = await api.get<CommentResponse>(`/blog/post/${blogId}/comments`);
 return res.data;
}
