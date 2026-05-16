import { NavLink } from "react-router-dom";

const link = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`;

export default function Sidebar({ items }) {
  return (
    <aside className="w-full md:w-56 md:min-h-[calc(100vh-57px)] bg-white border-r p-3">
      <nav className="space-y-1">
        {items.map((i) => (
          <NavLink key={i.to} to={i.to} end className={link}>{i.label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}
