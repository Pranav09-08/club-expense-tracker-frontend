export default function Dashboard() {
  const metrics = [
    { label: "Pending Payouts", value: "14" },
    { label: "Approved Today", value: "6" },
    { label: "Monthly Disbursed", value: "₹2,12,300" },
    { label: "Rejected Claims", value: "3" },
  ];

  const payouts = [
    { ref: "PAY-918", club: "Photography", amount: "₹7,500", due: "02 Apr 2026" },
    { ref: "PAY-917", club: "Coding", amount: "₹10,200", due: "02 Apr 2026" },
    { ref: "PAY-915", club: "Dance", amount: "₹4,850", due: "03 Apr 2026" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Finance Lead Dashboard</h1>
        <p className="text-sm text-slate-500">Control approvals, payment disbursals, and month-end financial summaries.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Upcoming Payouts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2 font-medium">Reference</th>
                  <th className="pb-2 font-medium">Club</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Due Date</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {payouts.map((item) => (
                  <tr key={item.ref} className="border-t">
                    <td className="py-2">{item.ref}</td>
                    <td className="py-2">{item.club}</td>
                    <td className="py-2">{item.amount}</td>
                    <td className="py-2">{item.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Compliance Checks</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">3 claims missing GST invoice</div>
            <div className="rounded-xl border bg-slate-50 p-3">1 duplicate bill detected in March entries</div>
            <div className="rounded-xl border bg-slate-50 p-3">Quarterly reconciliation due in 5 days</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Monthly Finance Overview</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-600">Requested</p>
            <p className="text-xl font-bold text-slate-900">₹2,38,900</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-600">Approved</p>
            <p className="text-xl font-bold text-slate-900">₹2,12,300</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-600">Variance</p>
            <p className="text-xl font-bold text-slate-900">₹26,600</p>
          </div>
        </div>
      </section>
    </div>
  );
}