export default function HelpPage() {
  const faqs = [
    {
      question: "How do I submit an expense request?",
      answer: "Go to your role dashboard, open the expense section, fill all mandatory fields, and submit for approval.",
    },
    {
      question: "Can I edit a submitted request?",
      answer: "Requests can be edited only before approval. Once approved, create a correction request through your coordinator.",
    },
    {
      question: "How long does finance approval take?",
      answer: "Typical turnaround is 1-2 working days based on document completeness and budget availability.",
    },
  ];

  const guides = [
    { title: "Expense Submission Checklist", status: "Updated Mar 2026" },
    { title: "Stationary Request SOP", status: "Updated Feb 2026" },
    { title: "Reimbursement Timeline Guide", status: "Updated Jan 2026" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Help Center</h1>
        <p className="text-sm text-slate-500">Find answers, process guides, and support contacts for smooth expense operations.</p>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-xl border bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">User Guides</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {guides.map((guide) => (
            <div key={guide.title} className="rounded-xl border p-4">
              <p className="text-sm font-semibold text-slate-900">{guide.title}</p>
              <p className="text-xs text-slate-500">{guide.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}