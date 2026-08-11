import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Public from "../layout/Public";
import Protected from "../layout/protected";
import Landing from "../features/home/pages/Landing";
import Conversation from "../features/conversation/pages/Conversation";

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

        element: <Conversation />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default Router;
