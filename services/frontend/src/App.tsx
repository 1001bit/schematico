import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Index, { loader as indexLoader } from "./pages/Index";
import Project, { loader as projectLoader } from "./pages/Project";
import { TitleProvider } from "./hooks/title/TitleContext";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Index,
        loader: indexLoader,
        HydrateFallback: () => <div>Loading...</div>,
        errorElement: <div>Unexpected error</div>,
      },
      {
        path: "project/:projectId",
        Component: Project,
        loader: projectLoader,
        HydrateFallback: () => <div>Loading...</div>,
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
  return (
    <TitleProvider>
      {" "}
      <RouterProvider router={router} />
    </TitleProvider>
  );
}

export default App;
