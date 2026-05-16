export default function SubmissionTable({ rows, showWorker }) {
  if (!rows?.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-sm font-medium text-gray-400 shadow-sm">
        No reports submitted yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse m-0">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Region</th>
              <th className="px-6 py-4">Activity</th>
              <th className="px-6 py-4">Participants</th>
              <th className="px-6 py-4">Reported Issue</th>
              {showWorker && <th className="px-6 py-4">Field Worker</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
            {rows.map((r) => {
              // Dynamically color-code your specific activity types
              const isTraining = r.activityType?.toLowerCase() === "training";
              const isAwareness = r.activityType?.toLowerCase() === "awareness";
              
              let activityStyle = "bg-slate-50 text-slate-700 border-slate-100";
              if (isTraining) activityStyle = "bg-purple-50 text-purple-700 border-purple-100";
              if (isAwareness) activityStyle = "bg-amber-50 text-amber-700 border-amber-100";

              return (
                <tr key={r._id} className="hover:bg-gray-50/40 transition-colors duration-150">
                  {/* Date Column */}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {new Date(r.dateConducted).toLocaleDateString()}
                  </td>
                  
                  {/* Region Badge */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                      {r.region}
                    </span>
                  </td>
                  
                  {/* Activity Badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${activityStyle}`}>
                      {r.activityType}
                    </span>
                  </td>
                  
                  {/* Participants Count */}
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {r.participantsCount.toLocaleString()}
                  </td>
                  
                  {/* Major Issue Text */}
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {r.majorIssue || <span className="text-gray-300">—</span>}
                  </td>
                  
                  {/* Field Worker Name */}
                  {showWorker && (
                    <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                      {r.workerId?.name || <span className="text-gray-300">—</span>}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}