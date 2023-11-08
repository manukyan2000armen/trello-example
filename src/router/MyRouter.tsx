import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Personal from "../pages/Personal";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export const MyRouter: React.FC = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "personal",
          element: <Personal />,
        },
      ],
    },
  ]);
  return router;
};
