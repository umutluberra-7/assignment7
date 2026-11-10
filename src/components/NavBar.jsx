import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCartStore, selectItemCount } from "../store/cartStore";

function NavBar({ theme, onToggleTheme }) {
  const { user, logOut } = useAuth();
  const itemCount = useCartStore(selectItemCount);

  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart ({itemCount})</NavLink>

      <div className="navbar-right">
        <button onClick={onToggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={logOut}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;