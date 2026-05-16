import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

export default function AuthCallback() {
  const [sp] = useSearchParams();
  const { setToken } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    const t = sp.get("token");
    if (t) setToken(t).then(() => nav("/"));
    else nav("/login");
  }, []);
  return <div className="p-6">Signing you in…</div>;
}
