import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";

export default function AdminLayout() {
  const items = [
    { to: "/", label: "Dashboard" },
    { to: "/reports", label: "All Reports" },
    { to: "/ai-summary", label: "AI Summary" },
    { to: "/users", label: "Users" },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50/50 m-0 p-0 overflow-hidden">
      {/* 1. Global Top Header Header Navigation Banner */}
      <div className="w-full h-16 bg-white border-b border-gray-100 flex-shrink-0 z-50">
        <Navbar />
      </div>

      {/* 2. Main Body Grid Compartment Split */}
      <div className="flex flex-1 w-full overflow-hidden">
        
        {/* Sidebar Panel - Pinned flush against the absolute left window edge */}
        <aside className="w-64 h-full bg-white border-r border-gray-100 flex-shrink-0 overflow-y-auto">
          <Sidebar items={items} />
        </aside>

        {/* Scrollable Page Canvas Frame Section */}
        <main className="flex-1 h-full overflow-y-auto p-6 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
}