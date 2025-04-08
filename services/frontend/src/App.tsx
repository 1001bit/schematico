import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Index, { loader as indexLoader } from "./pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Index,
        loader: indexLoader,
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
