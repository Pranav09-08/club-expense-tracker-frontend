import { useEffect, useMemo, useState } from "react";
import { listFinanceExpenses } from "@/api/authAPI";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listFinanceExpenses();
      setExpenses(res?.expenses || []);
    } catch (err) {
      setError(err.message || "Failed to load finance data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const metrics = useMemo(() => {
    const approved = expenses.filter((item) => String(item.status || "").toUpperCase() === "APPROVED");
    const pending = expenses.filter((item) => String(item.status || "").toUpperCase() === "SUBMITTED");
    const rejected = expenses.filter((item) => String(item.status || "").toUpperCase() === "REJECTED");
    const approvedTotal = approved.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return [
      { label: "Pending Approvals", value: String(pending.length) },
      { label: "Approved Expenses", value: String(approved.length) },
      { label: "Approved Amount", value: `INR ${approvedTotal.toFixed(2)}` },
      { label: "Rejected Claims", value: String(rejected.length) },
    ];
  }, [expenses]);

  const payouts = useMemo(() => {
    return expenses.slice(0, 5).map((item) => ({
      ref: `EXP-${item.id}`,
      club: item.submitted_by_name || item.submitted_by_email || "Club expense",
      amount: item.amount ? `INR ${item.amount}` : "-",
      due: item.submitted_at ? new Date(item.submitted_at).toLocaleDateString() : "-",
    }));
  }, [expenses]);

  const totalRequested = useMemo(
    () => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses]
  );
  const approvedTotal = useMemo(
    () => expenses.filter((item) => String(item.status || "").toUpperCase() === "APPROVED").reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses]
  );
  const variance = Math.max(totalRequested - approvedTotal, 0);

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
          {!loading && payouts.length === 0 && (
            <div className="mt-3 rounded-xl border bg-slate-50 p-3 text-sm text-slate-600">No finance entries available yet.</div>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Compliance Checks</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Total expense entries: {expenses.length}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Pending review: {metrics[0].value}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Rejected records: {metrics[3].value}</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Monthly Finance Overview</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-600">Requested</p>
            <p className="text-xl font-bold text-slate-900">INR {totalRequested.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-600">Approved</p>
            <p className="text-xl font-bold text-slate-900">INR {approvedTotal.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-600">Variance</p>
            <p className="text-xl font-bold text-slate-900">INR {variance.toFixed(2)}</p>
          </div>
        </div>
      </section>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
    </div>
  );
}