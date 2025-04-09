import { Link, Outlet } from "react-router";
import { useTitle } from "../hooks/title/TitleContext";
import { useEffect } from "react";

function Layout() {
  const title = useTitle();

  useEffect(() => {
    document.title = `schematico, ${title.title}`;
  }, [title]);

  return (
    <>
      <div className="flex flex-row px-2 justify-between">
        <Link to="/">
          <h3>schematico</h3>
        </Link>
        <h3>{title.title}</h3>
      </div>

      <main className="px-2 flex-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
