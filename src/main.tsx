import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/home-page";
import "./index.css";
import Dashboard from "./components/home-page/dashboard";
import Auth from "./pages/auth";
import { Signup } from "./components/auth/singup";
import { Login } from "./components/auth/login";
import ProtectedRoute from "./middleware/protected-route";
import SettingsPage from "./pages/settings-page";
import ProfileSettings from "./components/settings-page/profile-settings";
import AccountSettings from "./components/settings-page/account-settings";
import ForgotPassword from "./components/auth/forgot-password";
import Varification from "./components/auth/varification";
import ResetPassword from "./components/auth/reset-password";
import UserAccounts from "./components/home-page/user-accounts";
import CreateCourse from "./components/home-page/create-course";
import AvailableCourses from "./components/home-page/available-courses";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "user-accounts",
        element: <UserAccounts />,
      },
      {
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        path: "available-courses",
        element: <AvailableCourses />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "varification",
        element: <Varification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/settings/profile" replace />,
      },
      {
        path: "profile",
        element: <ProfileSettings />,
      },
      {
        path: "account",
        element: <AccountSettings />,
      },
    ],
  },
  // Global wildcard route for all unmatched paths
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
