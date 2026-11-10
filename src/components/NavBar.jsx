import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logOut } = useAuth();

  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>

      <div className="navbar-right">
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