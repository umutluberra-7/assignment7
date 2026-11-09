import { Outlet } from "react-router";
import NavBar from "./NavBar";

function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>© 2026 Online Shop</footer>
    </div>
  );
}

export default Layout;