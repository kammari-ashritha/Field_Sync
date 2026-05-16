import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); setErr("");
    try { await login(form.email, form.password); nav("/"); }
    catch (e) { setErr(e.response?.data?.message || "Login failed"); }
  };

  const googleUrl = `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "")}/api/auth/google`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="card w-full max-w-sm space-y-3">
        <h1 className="text-lg font-semibold">Login</h1>
        {err && <div className="text-sm text-red-600">{err}</div>}
        <div><label className="label">Email</label>
          <input className="input" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
        <div><label className="label">Password</label>
          <input className="input" type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
        <button className="btn w-full">Login</button>
        <a href={googleUrl} className="btn-light w-full">Continue with Google</a>
        <p className="text-sm text-gray-500">No account? <Link className="underline" to="/register">Sign up</Link></p>
      </form>
    </div>
  );
}
