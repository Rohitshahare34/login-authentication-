import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { clearToken } from "../utils/auth";

const PAGE_SIZE = 10;

const styles = {
  container: { padding: 16, maxWidth: 900, margin: "0 auto" },
  headerRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  headerActions: { display: "flex", gap: 8, alignItems: "center" },
  searchRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", background: "white" },
  th: { textAlign: "left", borderBottom: "1px solid #ddd" },
  td: { padding: "8px 4px", borderBottom: "1px solid #eee" },
  paginationRow: { display: "flex", gap: 8, marginTop: 12 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("users/");
      setUsers(res.data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => String(u.username).toLowerCase().includes(q));
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedUsers = filteredUsers.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  const logout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h3 style={{ margin: 0 }}>Users</h3>
        <div style={styles.headerActions}>
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={loadUsers} disabled={loading}>
            Refresh
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={styles.searchRow}>
        <input
          placeholder="Search username..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          style={{ minWidth: 220 }}
        />
        <div style={{ fontSize: 14 }}>
          {filteredUsers.length} total, page {safePage}/{totalPages}
        </div>
      </div>

      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Date joined</th>
              </tr>
            </thead>
            <tbody>
              {pagedUsers.map((u) => (
                <tr key={u.id}>
                  <td style={styles.td}>{u.id}</td>
                  <td style={styles.td}>{u.username}</td>
                  <td style={styles.td}>
                    {u.date_joined ? new Date(u.date_joined).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
              {pagedUsers.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: 12 }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div style={styles.paginationRow}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage <= 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
