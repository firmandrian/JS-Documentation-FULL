import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterForm from "./register/register.jsx";
import Home from "./home/home";
import Login from "./login/login";
import Chat from "./chat/Chat.jsx";
import ForgotPassword from "./forgot-password/forgotPassword.jsx";
import ResetPassword from "../reset-password/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home/chat",
    element: <Chat />,
  },
  {
    path: "/login/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
