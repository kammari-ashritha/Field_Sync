// frontend/src/Layouts/AdminLayout.jsx
import React from "react";
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
    <div className="flex flex-col h-screen w-screen bg-slate-50/50 m-0 p-0 overflow-hidden">
      {/* Header Anchor Frame */}
      <div className="w-full h-16 flex-shrink-0 z-50">
        <Navbar />
      </div>

      {/* Main Structural Layout Workspace Split */}
      <div className="flex flex-1 w-full overflow-hidden">
        
        {/* Colorful Deep Slate Left Sidebar Navigation Wall */}
        <aside className="w-64 h-full flex-shrink-0 shadow-lg z-40">
          <Sidebar items={items} />
        </aside>

        {/* Scrollable Page View Component Canvas Area */}
        <main className="flex-1 h-full overflow-y-auto p-8 bg-gradient-to-b from-indigo-50/20 via-transparent to-transparent">
          <Outlet />
        </main>

      </div>
    </div>
  );
}