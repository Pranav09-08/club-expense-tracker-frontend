import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listMemberExpenses } from "@/api/authAPI";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listMemberExpenses();
      setExpenses(res?.expenses || []);
    } catch (err) {
      setError(err.message || "Failed to load expense data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const overview = useMemo(() => {
    const submitted = expenses.filter((item) => String(item.status || "").toUpperCase() === "SUBMITTED");
    const approved = expenses.filter((item) => String(item.status || "").toUpperCase() === "APPROVED");
    const pending = expenses.filter((item) => String(item.status || "").toUpperCase() === "SUBMITTED");
    const reimbursedTotal = approved.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return [
      { label: "Submitted Requests", value: String(submitted.length) },
      { label: "Approved", value: String(approved.length) },
      { label: "Pending", value: String(pending.length) },
      { label: "Approved Amount", value: `INR ${reimbursedTotal.toFixed(2)}` },
    ];
  }, [expenses]);

  const myRequests = useMemo(() => {
    return [...expenses].slice(0, 5).map((item) => ({
      ref: `EXP-${item.id}`,
      purpose: item.title,
      amount: item.amount ? `INR ${item.amount}` : "-",
      status: item.status,
    }));
  }, [expenses]);

  const reimbursedTotal = useMemo(
    () => expenses.filter((item) => String(item.status || "").toUpperCase() === "APPROVED").reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses]
  );

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
            {!loading && myRequests.length === 0 && (
              <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-600">No expense requests found.</div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Reimbursement Timeline</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Expenses approved: INR {reimbursedTotal.toFixed(2)}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Pending review: {overview[2].value}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Total submitted: {expenses.length}</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Submit New Expense</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-600">Use the Submit Expense page to create a new request.</div>
          <div className="rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-600">Your submitted expenses appear above from the API.</div>
        </div>
        <div className="mt-4 flex justify-end">
          <Link to="/member/add-expense" className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">Go to Submit Expense</Link>
        </div>
      </section>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
    </div>
  );
}