import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <div className="flex flex-row ps-1">
        <Link to="/">
          <h3>schematico</h3>
        </Link>
      </div>

      <main className="ps-1">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
