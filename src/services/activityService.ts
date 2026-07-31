import { api } from "../lib/api";
import type { NotificationsResponse, BookmarksResponse } from "../lib/activity";


export const getNotification = async(): Promise<NotificationsResponse> =>{
  const res = await api.get<NotificationsResponse>("/user/auth/notifications");
  return res.data
}

export const getBookmarks =async(): Promise<BookmarksResponse> =>{
   const res = await api.get<BookmarksResponse>("/blog/bookmarks");
    return res.data
}
