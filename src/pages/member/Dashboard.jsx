export default function Dashboard() {
  const overview = [
    { label: "Submitted Requests", value: "9" },
    { label: "Approved", value: "6" },
    { label: "Pending", value: "2" },
    { label: "Reimbursed", value: "₹18,450" },
  ];

  const myRequests = [
    { ref: "ME-302", purpose: "Event Decorations", amount: "₹2,700", status: "Pending" },
    { ref: "ME-294", purpose: "Transport", amount: "₹1,250", status: "Approved" },
    { ref: "ME-288", purpose: "Printing", amount: "₹980", status: "Reimbursed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Member Dashboard</h1>
        <p className="text-sm text-slate-500">Submit expenses, upload proofs, and track reimbursement status.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overview.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">My Expense Requests</h2>
          <div className="space-y-3">
            {myRequests.map((item) => (
              <div key={item.ref} className="rounded-xl border bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{item.ref} · {item.purpose}</p>
                  <span className="rounded-full border bg-white px-2 py-1 text-xs font-medium text-slate-700">{item.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">Amount: {item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Reimbursement Timeline</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Submission validation: 1 day</div>
            <div className="rounded-xl border bg-slate-50 p-3">Coordinator review: 1-2 days</div>
            <div className="rounded-xl border bg-slate-50 p-3">Finance payout: 2 days</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Submit New Expense</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Expense Purpose" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Amount (₹)" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Date of Expense" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Bill / Invoice Number" />
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">Submit Request</button>
        </div>
      </section>
    </div>
  );
}