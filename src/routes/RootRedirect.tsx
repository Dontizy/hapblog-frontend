import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import HomePage from "../pages/HomePage.tsx"

export default function RootRedirect() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const hasHydrated = useAuthStore(
    (state) => state.hasHydrated
  );

  // Wait for persisted auth state
  if (!hasHydrated) {
    return null;
  }

  // Logged in → feeds
  if (isAuthenticated) {
    return <Navigate to="/feeds" replace />;
  }

  // Not logged in → landing page
  return <HomePage />;
}