import React from "react";
import { createBrowserRouter } from "react-router-dom";
const Login = React.lazy(() => import("../pages/Login"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Register = React.lazy(() => import("../pages/Register"));
import Layout from "./Layout";
const TwoFactorAuth = React.lazy(() => import("../pages/TwoFactorAuth"));
const Home = React.lazy(() => import("../pages/Home"));

import { withLoading } from "../hoc/withLoading";

const HomePage = withLoading(Home);
const LoginPage = withLoading(Login);
const RegisterPage = withLoading(Register);
const ProfilePage = withLoading(Profile);
const TwoFactorAuthPage = withLoading(TwoFactorAuth);

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/two-factor-auth",
        element: <TwoFactorAuthPage />,
      },
    ],
  },
]);
