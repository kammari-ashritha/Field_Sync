import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";

export default function SubmitForm() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    region: "", activityType: "", participantsCount: 0, majorIssue: "",
    description: "", beneficiaryInfo: "", dateConducted: new Date().toISOString().slice(0, 10),
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      await api.post("/submission", { ...form, participantsCount: Number(form.participantsCount) });
      nav("/my-reports");
    } catch (e) { setErr(e.response?.data?.message || "Failed"); }
    finally { setBusy(false); }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-lg font-semibold mb-3">Submit Report</h1>
      <form onSubmit={onSubmit} className="card grid grid-cols-1 sm:grid-cols-2 gap-3">
        {err && <div className="sm:col-span-2 text-sm text-red-600">{err}</div>}
        <div><label className="label">Region</label><input className="input" value={form.region} onChange={onChange("region")} required /></div>
        <div><label className="label">Activity Type</label><input className="input" value={form.activityType} onChange={onChange("activityType")} required /></div>
        <div><label className="label">Participants</label><input className="input" type="number" min="0" value={form.participantsCount} onChange={onChange("participantsCount")} /></div>
        <div><label className="label">Date Conducted</label><input className="input" type="date" value={form.dateConducted} onChange={onChange("dateConducted")} required /></div>
        <div className="sm:col-span-2"><label className="label">Major Issue</label><input className="input" value={form.majorIssue} onChange={onChange("majorIssue")} /></div>
        <div className="sm:col-span-2"><label className="label">Description</label><textarea className="input" rows="3" value={form.description} onChange={onChange("description")} /></div>
        <div className="sm:col-span-2"><label className="label">Beneficiary Info</label><textarea className="input" rows="2" value={form.beneficiaryInfo} onChange={onChange("beneficiaryInfo")} /></div>
        <div className="sm:col-span-2"><button className="btn" disabled={busy}>{busy ? "Saving…" : "Submit"}</button></div>
      </form>
    </div>
  );
}
