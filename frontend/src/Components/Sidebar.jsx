// frontend/src/Components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ items }) {
  return (
    <nav className="w-full h-full flex flex-col gap-1.5 p-4 bg-slate-900 text-slate-300">
      <div className="px-3 mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        Navigation Map
      </div>

      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) => `
            flex items-center px-4 py-3 rounded-xl font-medium tracking-wide transition-all duration-200 gap-3 group
            ${isActive 
              ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-900/40 translate-x-1" 
              : "hover:bg-slate-800/60 hover:text-white"
            }
          `}
        >
          {/* Decorative small dot matrix point indicators */}
          <span className="w-2 h-2 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}