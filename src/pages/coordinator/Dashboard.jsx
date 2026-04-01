export default function Dashboard() {
  const kpis = [
    { label: "Assigned Clubs", value: "6" },
    { label: "Pending Approvals", value: "11" },
    { label: "Escalated Cases", value: "2" },
    { label: "Approved This Week", value: "19" },
  ];

  const approvals = [
    { id: "EXP-241", club: "Coding Club", amount: "₹5,600", priority: "High" },
    { id: "EXP-238", club: "Drama Club", amount: "₹3,200", priority: "Medium" },
    { id: "EXP-236", club: "Robotics Club", amount: "₹9,850", priority: "High" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Coordinator Dashboard</h1>
        <p className="text-sm text-slate-500">Review club requests, resolve bottlenecks, and maintain policy compliance.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Pending Approval Queue</h2>
          <div className="space-y-3">
            {approvals.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.id} · {item.club}</p>
                  <p className="text-sm text-slate-600">Requested amount: {item.amount}</p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-700 border">{item.priority}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Alerts</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Robotics Club exceeded 80% monthly budget</div>
            <div className="rounded-xl border bg-slate-50 p-3">2 requests missing invoice attachments</div>
            <div className="rounded-xl border bg-slate-50 p-3">Finance follow-up required for 3 delayed payouts</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Club Snapshot</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Coding Club</p>
            <p className="text-xs text-slate-500">Utilization</p>
            <p className="text-lg font-bold text-slate-900">74%</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Drama Club</p>
            <p className="text-xs text-slate-500">Utilization</p>
            <p className="text-lg font-bold text-slate-900">61%</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Robotics Club</p>
            <p className="text-xs text-slate-500">Utilization</p>
            <p className="text-lg font-bold text-slate-900">82%</p>
          </div>
        </div>
      </section>
    </div>
  );
}