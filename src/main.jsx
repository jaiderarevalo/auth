import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import RegisterPages from "./pages/RegisterPages";
import LoginPages from "./pages/LoginPages";
import { AuthProvider } from "./context/AuthContext";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomePage from "./pages/HomePage";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element:(<><Navbar/><HomePage /></>)
  },
  {
    path: "/login",
    element:(<><Navbar/> <LoginPages /></>)
  },
  {
    path: "/register",
    element:(<><Navbar/><RegisterPages /></>)
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/tasks",
        element: (<><Navbar/> <TaskPage /></>)
      },
      {
        path: "/add-task",
        element:(<><Navbar/><TaskFormPage /></>)
      },
      {
        path: "/tasks/:id",
        element:(<><Navbar/><TaskFormPage /></>)
      },
      {
        path: "/profile",
        element:(<><Navbar/><ProfilePage /></>)
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router}  />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
