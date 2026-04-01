export default function AboutPage() {
  const metrics = [
    { label: "Active Clubs", value: "18" },
    { label: "Monthly Requests", value: "340+" },
    { label: "Average Approval Time", value: "1.8 Days" },
    { label: "Monthly Payout", value: "₹2.47L" },
  ];

  const timeline = [
    { phase: "Request Submission", detail: "Members and club leads submit expenses with bills and category details." },
    { phase: "Coordinator Review", detail: "Coordinator validates necessity, policy compliance, and club budget impact." },
    { phase: "Finance Approval", detail: "Finance lead verifies documents and approves payment schedule." },
    { phase: "Closure & Reporting", detail: "Final status is recorded for audit trail and monthly analytics." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">About Club Expense Tracker</h1>
        <p className="text-sm text-slate-500">A centralized platform to improve financial discipline, speed, and transparency for campus clubs.</p>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Our Mission</h2>
        <p className="text-sm leading-6 text-slate-600">
          We built this system to remove manual tracking and delayed approvals in club finance operations. With role-based workflows and standardized data fields,
          teams can submit, review, approve, and audit expenses in one place.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">How It Works</h2>
        <div className="space-y-3">
          {timeline.map((step, index) => (
            <div key={step.phase} className="rounded-xl border bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">{index + 1}. {step.phase}</p>
              <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}