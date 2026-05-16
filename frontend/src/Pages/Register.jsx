import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); setErr("");
    try { await register(form.name, form.email, form.password); nav("/"); }
    catch (e) { setErr(e.response?.data?.message || "Register failed"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="card w-full max-w-sm space-y-3">
        <h1 className="text-lg font-semibold">Sign up</h1>
        {err && <div className="text-sm text-red-600">{err}</div>}
        <div><label className="label">Name</label>
          <input className="input" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
        <div><label className="label">Email</label>
          <input className="input" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
        <div><label className="label">Password</label>
          <input className="input" type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
        <button className="btn w-full">Create account</button>
        <p className="text-sm text-gray-500">Have an account? <Link className="underline" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
