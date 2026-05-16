// frontend/src/Components/CanvasIcon.jsx
import React from "react";

export default function CanvasIcon() {
  return (
    <svg 
      className="w-7 h-7 text-indigo-600 drop-shadow-sm" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sleek Canvas Grid Node Vector Mapping Shape */}
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M9 6.75V15m6-11.25V18m-9-3.75h.008v.008H6V15zm.008-3h.008v.008H6V12zm.008-3h.008v.008H6V9zm7.5 0h.008v.008h-.008V9zm0 3h.008v.008h-.008V12zm0 3h.008v.008h-.008V15zm7.5-6h.008v.008H21V9zm0 3h.008v.008H21V12zm0 3h.008v.008H21V15zM3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}