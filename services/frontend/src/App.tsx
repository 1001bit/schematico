import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Home, { loader as homeLoader } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
        errorElement: <div>Unexpected error</div>,
      },
      {
        path: "*",
        Component: () => <div>Not found</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
