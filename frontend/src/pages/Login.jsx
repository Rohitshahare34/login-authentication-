import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { setToken } from "../utils/auth";

const styles = {
  form: { display: "grid", gap: 8, maxWidth: 320 },
  error: { color: "red" },
};

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("login/", { username, password });
      setToken(res.data.access);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={login} style={styles.form}>
      <h3>Login</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div style={styles.error}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <div>
        <Link to="/signup">Create account</Link>
      </div>
    </form>
  );
}
