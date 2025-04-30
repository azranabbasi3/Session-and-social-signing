import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <div className="app">
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
