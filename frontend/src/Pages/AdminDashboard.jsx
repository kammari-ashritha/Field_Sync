import { useEffect, useState } from "react";
import api from "../utils/axiosInstance.js";
import DashboardCards from "../Components/DashboardCards.jsx";
import SubmissionTable from "../Components/SubmissionTable.jsx";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/submission/stats").then((r) => setStats(r.data));
    api.get("/submission").then((r) => setRows(r.data.submissions.slice(0, 10)));
  }, []);

  const regionEntries = Object.entries(stats?.regions || {});
  const activityEntries = Object.entries(stats?.activities || {});

  // Pass a clean structured summary object to the metric cards component
  const localizedCardMetrics = {
    totalReports: stats?.totalSubmissions || 0, // Maps to your backend property
    totalParticipants: stats?.totalParticipants || 0,
    regionsCount: regionEntries.length,       // Safely passes a count number
    activitiesCount: activityEntries.length,   // Safely passes a count number
  };

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time NGO field activity data and insights</p>
        </div>
      </div>

      {/* Stats Metric Cards Component */}
      <DashboardCards metrics={localizedCardMetrics} />

      {/* Mid-Section: Split Grid Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Reports by Region Box */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 text-base">Reports by Region</h2>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Geographic Split</span>
          </div>
          <div className="space-y-3">
            {regionEntries.map(([regionName, count]) => (
              <div key={regionName} className="flex items-center justify-between border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                <span className="capitalize font-medium text-gray-600 text-sm">{regionName}</span>
                <span className="bg-blue-50 text-blue-600 font-semibold text-xs px-2.5 py-1 rounded-md border border-blue-100">
                  {count} {count === 1 ? 'report' : 'reports'}
                </span>
              </div>
            ))}
            {!regionEntries.length && (
              <div className="text-sm text-gray-400 text-center py-6">No regional data available yet.</div>
            )}
          </div>
        </div>

        {/* Reports by Activity Box */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 text-base">Reports by Activity</h2>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Task Type Split</span>
          </div>
          <div className="space-y-3">
            {activityEntries.map(([activityName, count]) => {
              const isTraining = activityName?.toLowerCase() === "training";
              const isAwareness = activityName?.toLowerCase() === "awareness";
              let badgeColor = "bg-slate-50 text-slate-600 border-slate-100";
              if (isTraining) badgeColor = "bg-purple-50 text-purple-600 border-purple-100";
              if (isAwareness) badgeColor = "bg-amber-50 text-amber-600 border-amber-100";

              return (
                <div key={activityName} className="flex items-center justify-between border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                  <span className="capitalize font-medium text-gray-600 text-sm">{activityName}</span>
                  <span className={`font-semibold text-xs px-2.5 py-1 rounded-md border ${badgeColor}`}>
                    {count} {count === 1 ? 'session' : 'sessions'}
                  </span>
                </div>
              );
            })}
            {!activityEntries.length && (
              <div className="text-sm text-gray-400 text-center py-6">No activity data available yet.</div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Section: Detailed Table Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-800 text-lg">Recent Field Reports</h2>
          <span className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-sm">
            Showing latest 10 submissions
          </span>
        </div>
        <SubmissionTable rows={rows} showWorker />
      </div>
    </div>
  );
}