import { useAuth } from "../Context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function WorkerHome() {
  const { user } = useAuth();
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">Welcome, {user?.name}</h1>
      <div className="card">
        <p className="text-sm text-gray-600">Submit a new field report or view your past reports.</p>
        <div className="mt-3 flex gap-2">
          <Link className="btn" to="/submit">Submit Report</Link>
          <Link className="btn-light" to="/my-reports">My Reports</Link>
        </div>
      </div>
    </div>
  );
}
