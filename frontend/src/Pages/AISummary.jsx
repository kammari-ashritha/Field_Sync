import { useState } from "react";
import api from "../utils/axiosInstance.js";

export default function AISummary() {
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const gen = async () => {
    setBusy(true); setErr(""); setSummary("");
    try {
      const { data } = await api.post("/ai/generate-summary");
      setSummary(data.summary);
    } catch (e) { setErr(e.response?.data?.message || "Failed"); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">AI Summary</h1>
      <div className="card">
        <p className="text-sm text-gray-600 mb-3">Generate an AI summary and insights from all submitted reports.</p>
        <button className="btn" disabled={busy} onClick={gen}>{busy ? "Generating…" : "Generate Summary"}</button>
        {err && <div className="text-sm text-red-600 mt-3">{err}</div>}
        {summary && <pre className="mt-4 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">{summary}</pre>}
      </div>
    </div>
  );
}
