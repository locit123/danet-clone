import {
  FilmPackage,
  FreeMovie,
  Home,
  NotFound,
  Television,
} from "@pages/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/free-movie",
      element: <FreeMovie />,
    },
    {
      path: "/film-package",
      element: <FilmPackage />,
    },
    {
      path: "/television",
      element: <Television />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
