import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
const styles = {
  form: { display: "grid", gap: 8, maxWidth: 320 },
  error: { color: "red" },
  success: { color: "green" },
};

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("register/", { username, password });
      setSuccess("Account created. Please login.");
      setTimeout(() => navigate("/login", { replace: true }), 500);
    } catch (err) {
      const data = err?.response?.data;
      setError(
        data?.username?.[0] ||
          data?.password?.[0] ||
          data?.detail ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={signup} style={styles.form}>
      <h3>Signup</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password (min 8 chars)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </button>
      <div>
        <Link to="/login">Back to login</Link>
      </div>
    </form>
  );
}
