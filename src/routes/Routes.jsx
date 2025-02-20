import { createBrowserRouter } from "react-router-dom";


import ErrorPage from "../pages/ErrorPage";
import Main from "./../layouts/Main";
import Login from "./../pages/Authentication/Login";
import Register from "./../pages/Authentication/Register";
import Home from "./../pages/Home";

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
    ],
  },
]);

export default router;
