import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Public from "../layout/Public";
import Protected from "../layout/protected";
import Conversations from "../features/conversation/pages/Conversations";
import Landing from "../features/home/pages/Landing";

const router = createBrowserRouter([
  {
    element: <Public />,

    children: [
      {
        path: "/",

        element: <Landing />,
      },
    ],
  },

  {
    element: <Protected />,

    children: [
      {
        path: "/conversations",

        element: <Conversations />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default Router;
