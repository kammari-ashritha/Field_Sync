import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">FieldSync</Link>
        <nav className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="text-gray-500 hidden sm:inline">{user.email} ({user.role})</span>
              <button className="btn-light" onClick={() => { logout(); nav("/login"); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-light" to="/login">Login</Link>
              <Link className="btn" to="/register">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
