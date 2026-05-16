// frontend/src/Layouts/WorkerLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";

export default function WorkerLayout() {
  const items = [
    { to: "/", label: "Home" },
    { to: "/submit", label: "Submit Report" },
    { to: "/my-reports", label: "My Reports" },
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
        <main className="flex-1 h-full overflow-y-auto p-8 bg-gradient-to-b from-blue-50/20 via-transparent to-transparent">
          <Outlet />
        </main>

      </div>
    </div>
  );
}