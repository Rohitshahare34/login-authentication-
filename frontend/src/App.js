import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { isAuthenticated } from "./utils/auth";

function App() {
  const authed = isAuthenticated();

  return (
    <div className="AppShell">
      <Routes>
        <Route path="/" element={<Navigate to={authed ? "/home" : "/login"} replace />} />
        <Route
          path="/login"
          element={authed ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={authed ? <Navigate to="/home" replace /> : <Signup />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={authed ? "/home" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
