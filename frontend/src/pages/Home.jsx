import { useNavigate } from "react-router-dom";

import { clearToken } from "../utils/auth";

const styles = {
  container: { padding: 24, maxWidth: 900, margin: "0 auto" },
  title: { marginTop: 0 },
  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 },
};

export default function Home() {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome Micronet</h2>
      <div style={styles.actions}>
        <button onClick={() => navigate("/dashboard")}>Open Users Table</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
