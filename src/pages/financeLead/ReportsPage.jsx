import { useEffect, useMemo, useState } from "react";
import { listFinanceExpenses } from "@/api/authAPI";

export default function ReportsPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listFinanceExpenses();
      setExpenses(res?.expenses || []);
    } catch (err) {
      setError(err.message || "Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const summary = useMemo(() => {
    return expenses.reduce(
      (acc, item) => {
        const amount = Number(item.amount || 0);
        acc.total += amount;
        if (item.status === "APPROVED") acc.approved += amount;
        if (item.status === "REJECTED") acc.rejected += amount;
        if (item.status === "SUBMITTED") acc.pending += amount;
        return acc;
      },
      { total: 0, approved: 0, rejected: 0, pending: 0 }
    );
  }, [expenses]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-sm text-slate-500">Club financial summary generated from expense API data.</p>
        </div>
        <button onClick={loadData} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Total</p><p className="mt-1 text-2xl font-bold text-slate-900">INR {summary.total.toFixed(2)}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Approved</p><p className="mt-1 text-2xl font-bold text-emerald-700">INR {summary.approved.toFixed(2)}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Pending</p><p className="mt-1 text-2xl font-bold text-amber-700">INR {summary.pending.toFixed(2)}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Rejected</p><p className="mt-1 text-2xl font-bold text-red-700">INR {summary.rejected.toFixed(2)}</p></div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent Entries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Title</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {expenses.slice(0, 8).map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-2">{item.title}</td>
                  <td className="py-2">INR {item.amount}</td>
                  <td className="py-2">{item.status}</td>
                </tr>
              ))}
              {!loading && expenses.length === 0 && <tr><td colSpan={3} className="py-3 text-slate-500">No expense data available.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
