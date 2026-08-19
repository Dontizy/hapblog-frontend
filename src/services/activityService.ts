import { api } from "../lib/api";
import type { NotificationsResponse, BookmarksResponse,  AddOrRemoveBookmarkResponse, MarkNotificationAsReadResponse
  } from "../lib/activity";


export const getNotification = async(): Promise<NotificationsResponse> =>{
  const res = await api.get<NotificationsResponse>("/user/auth/notifications");
  return res.data
}

export const getBookmarks =async(): Promise<BookmarksResponse> =>{
   const res = await api.get<BookmarksResponse>("/blog/bookmarks");
    return res.data
}

export const addOrRemoveBlogFromBookmark = async (
  id: string
): Promise<AddOrRemoveBookmarkResponse> => {
  const res = await api.patch<AddOrRemoveBookmarkResponse>(
    `/blog/${id}/bookmark`,
  );
  return res.data;
}

export const markNotification = async(id:string):Promise<MarkNotificationAsReadResponse>=>{
      const res = await api.patch<MarkNotificationAsReadResponse>(`/user/auth/notifications/${id}/read`)
      return res.data
}
