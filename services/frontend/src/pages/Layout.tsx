import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <div className="flex flex-row px-2">
        <Link to="/">
          <h3>schematico</h3>
        </Link>
      </div>

      <main className="px-2 flex-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
