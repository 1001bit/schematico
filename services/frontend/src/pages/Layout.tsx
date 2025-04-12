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
      <div className="flex flex-row px-5 py-2 justify-between">
        <Link to="/">
          <h3>schematico</h3>
        </Link>
        <h3>{title.title}</h3>
      </div>

      <Outlet />
    </>
  );
}

export default Layout;
