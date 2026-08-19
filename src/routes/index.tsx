import { Routes, Route, Outlet } from "react-router-dom";
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
import EditPostPage from "../components/EditPostPage";
import NotificationDetailPage from "../components/user/NotificationDetailPage";
import AdminPage from "../components/admin/AdminPage";
import DraftsListPage from "../components/blog/Draft";


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

        {/* All other routes wrapped in HeaderLayout */}
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<HomePage />} />
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
            path="/author/:username/profile"
            element={
              <ProtectedRoute>
                <PublicProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id/post"
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
                <NotificationDetailPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page"
            element={
              <ProtectedRoute>
                <AdminPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/drafts"
            element={
              <ProtectedRoute>
                <DraftsListPage/>
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
