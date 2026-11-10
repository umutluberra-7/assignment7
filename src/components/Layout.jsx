import { Outlet } from "react-router";
import NavBar from "./NavBar";
import useLocalStorage from "../hooks/useLocalStorage";

function Layout() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
      <footer>© 2026 Online Shop</footer>
    </div>
  );
}

export default Layout;