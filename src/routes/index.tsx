import { Routes, Route, Outlet } from "react-router-dom";
import FeedPage from "../components/FeedPage";
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
import EditPostPage from "../components/EditPostPage";
import NotificationDetailPage from "../components/user/NotificationDetailPage";
import AdminPage from "../components/admin/AdminPage";
import DraftsListPage from "../components/blog/Draft";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SearchAuthorsPage from "../components/user/SearchAuthorPage";
import RootRedirect from "./RootRedirect"


// Layout for pages that include the SiteHeader
function HeaderLayout() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
}

export default function AppRoutes() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        {/* Auth routes without SiteHeader */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
  path="/forgot-password"
  element={<ForgotPasswordPage />}
/>
        
        <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />


        {/* All other routes wrapped in HeaderLayout */}
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<RootRedirect />} />

          <Route path="/feeds" element={<FeedPage />} />
          <Route path="/feed/:slug" element={<BlogDetailPage />} />

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
            path="/explore"
            element={
              <ProtectedRoute>
                <SearchAuthorsPage/>
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
            path="/author/:username/profile"
            element={
              <ProtectedRoute>
                <PublicProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:slug/post"
            element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification/:id/detail"
            element={
              <ProtectedRoute>
                <NotificationDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/drafts"
            element={
              <ProtectedRoute>
                <DraftsListPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* Shared SiteFooter across all pages including login and register */}
      <SiteFooter />
    </div>
  );
}
