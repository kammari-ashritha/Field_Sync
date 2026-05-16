import { useEffect, useState } from "react";
import api from "../utils/axiosInstance.js";
import SubmissionTable from "../Components/SubmissionTable.jsx";

export default function AllReports() {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({ q: "", region: "", activityType: "", from: "", to: "" });

  const load = async () => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
    const { data } = await api.get("/submission", { params });
    setRows(data.submissions);
  };
  useEffect(() => { load(); }, []);

  const change = (k) => (e) => setFilters({ ...filters, [k]: e.target.value });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">All Reports</h1>
      <div className="card grid grid-cols-2 md:grid-cols-5 gap-2">
        <input className="input" placeholder="Search…" value={filters.q} onChange={change("q")} />
        <input className="input" placeholder="Region" value={filters.region} onChange={change("region")} />
        <input className="input" placeholder="Activity" value={filters.activityType} onChange={change("activityType")} />
        <input className="input" type="date" value={filters.from} onChange={change("from")} />
        <input className="input" type="date" value={filters.to} onChange={change("to")} />
        <div className="col-span-2 md:col-span-5"><button className="btn" onClick={load}>Apply Filters</button></div>
      </div>
      <SubmissionTable rows={rows} showWorker />
    </div>
  );
}
