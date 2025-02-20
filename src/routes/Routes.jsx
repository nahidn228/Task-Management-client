import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
import Main from "./../layouts/Main";
import Login from "./../pages/Authentication/Login";
import Register from "./../pages/Authentication/Register";
import Home from "./../pages/Home";

import AddTaskForm from "./../components/AddTaskForm";
import Tasks from "./../components/Tasks";
import TasksUpdate from "./../components/TasksUpdate";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/tasks",
        element: (
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/tasks/update/:id",
        element: (
          <PrivateRoute>
            <TasksUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: "/addTask",
        element: (
          <PrivateRoute>
            <AddTaskForm />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
