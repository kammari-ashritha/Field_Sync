// frontend/src/Components/Navbar.jsx
import React from "react";
import CanvasIcon from "./CanvasIcon.jsx";
import { useAuth } from "../Context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full h-16 bg-gradient-to-r from-white via-slate-50 to-indigo-50/30 px-6 flex items-center justify-between shadow-sm border-b border-gray-100">
      {/* Left Section: Icon & Branding Brandmark */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="p-2 bg-indigo-50 rounded-xl group-hover:scale-110 transition-transform duration-200">
          <CanvasIcon />
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600 bg-clip-text text-transparent">
          FieldSync
        </span>
      </div>

      {/* Right Section: Profile Interaction Menu Matrix */}
      {user && (
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-800">{user.name}</span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{user.role}</span>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-1.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}