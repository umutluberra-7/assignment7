import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(username, password);
      logIn(user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username (student email)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;