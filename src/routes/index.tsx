import { Routes, Route } from "react-router-dom";
import FeedPage from "../components/FeedPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import BlogDetailPage from "../components/BlogDetailPage";

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
      </Routes>
      <SiteFooter />
    </>
  );
}
