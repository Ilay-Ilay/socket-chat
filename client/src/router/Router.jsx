import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../features/home/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default Router;
