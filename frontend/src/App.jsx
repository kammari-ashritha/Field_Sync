import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AuthCallback from "./Pages/AuthCallback.jsx";

import WorkerLayout from "./Layouts/WorkerLayout.jsx";
import WorkerHome from "./Pages/WorkerHome.jsx";
import SubmitForm from "./Pages/SubmitForm.jsx";
import MyReports from "./Pages/MyReports.jsx";

import AdminLayout from "./Layouts/AdminLayout.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AllReports from "./Pages/AllReports.jsx";
import AISummary from "./Pages/AISummary.jsx";
import Users from "./Pages/Users.jsx";

export default function App() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading…</div>;

  const isAdmin = user?.role === "admin";

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {isAdmin ? (
        <Route element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/reports" element={<AllReports />} />
          <Route path="/ai-summary" element={<AISummary />} />
          <Route path="/users" element={<Users />} />
        </Route>
      ) : (
        <Route element={<ProtectedRoute><WorkerLayout /></ProtectedRoute>}>
          <Route path="/" element={<WorkerHome />} />
          <Route path="/submit" element={<SubmitForm />} />
          <Route path="/my-reports" element={<MyReports />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
