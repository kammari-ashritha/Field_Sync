import { useEffect, useState } from "react";
import api from "../utils/axiosInstance.js";
import SubmissionTable from "../Components/SubmissionTable.jsx";

export default function MyReports() {
  const [rows, setRows] = useState([]);
  useEffect(() => { api.get("/submission/mine").then((r) => setRows(r.data.submissions)); }, []);
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">My Reports</h1>
      <SubmissionTable rows={rows} />
    </div>
  );
}
