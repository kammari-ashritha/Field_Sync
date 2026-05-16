// frontend/src/Components/DashboardCards.jsx
export default function DashboardCards({ metrics }) {
  const cardItems = [
    { label: "Total Reports", value: metrics?.totalReports || 0, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Participants", value: metrics?.totalParticipants || 0, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Regions", value: metrics?.regionsCount || 0, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Activity Types", value: metrics?.activitiesCount || 0, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardItems.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{card.label}</p>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
              {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
            </h3>
          </div>
          <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
            <span className="font-semibold text-lg">✦</span>
          </div>
        </div>
      ))}
    </div>
  );
}