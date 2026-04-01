export default function Dashboard() {
  const stats = [
    { label: "Total Clubs", value: "18" },
    { label: "Active Users", value: "246" },
    { label: "Pending Requests", value: "26" },
    { label: "Monthly Spend", value: "₹2,47,000" },
  ];

  const recentApprovals = [
    { club: "Robotics", amount: "₹14,500", requestedBy: "A. More", status: "Approved" },
    { club: "Music", amount: "₹8,200", requestedBy: "K. Patil", status: "In Review" },
    { club: "Dance", amount: "₹6,700", requestedBy: "R. Shah", status: "Approved" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500">Monitor clubs, users, and expense approval flow across the platform.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Expense Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2 font-medium">Club</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Requested By</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {recentApprovals.map((row, index) => (
                  <tr key={`${row.club}-${index}`} className="border-t">
                    <td className="py-2">{row.club}</td>
                    <td className="py-2">{row.amount}</td>
                    <td className="py-2">{row.requestedBy}</td>
                    <td className="py-2">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Action Queue</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">4 club registration requests pending review</div>
            <div className="rounded-xl border bg-slate-50 p-3">2 user role change requests awaiting approval</div>
            <div className="rounded-xl border bg-slate-50 p-3">Monthly report for March 2026 ready for export</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Budget Distribution</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Technical Clubs</p>
            <p className="mt-1 text-xl font-bold text-slate-900">₹1,10,000</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Cultural Clubs</p>
            <p className="mt-1 text-xl font-bold text-slate-900">₹82,000</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Stationary & Misc</p>
            <p className="mt-1 text-xl font-bold text-slate-900">₹55,000</p>
          </div>
        </div>
      </section>
    </div>
  );
}