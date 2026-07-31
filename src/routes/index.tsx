import { Routes, Route } from "react-router-dom";
import FeedPage from "../components/FeedPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import BlogDetailPage from "../components/BlogDetailPage";
import UserProfile from "../components/user/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import NotificationsPage from "../components/user/NotificationPage";
import BookmarksPage from "../components/user/BookmarksPage";
import CreatePostPage from "../components/CreateBlogPage";
import NotFoundPage from "../components/NotFoundPage";
import SettingsPage from "../components/user/SettingsPage";
import PublicProfilePage from "../components/user/PublicProfilePage";


export default function AppRoutes() {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/feeds" element={<FeedPage />} />
        <Route path="/feed/:id" element={<BlogDetailPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <BookmarksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/author/:id/profile"
          element={
            <ProtectedRoute>
              <PublicProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <SiteFooter />
    </>
  );
}
