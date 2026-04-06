import { useEffect, useState } from "react";
import { decideFinanceExpense, listFinanceExpenses } from "@/api/authAPI";

export default function ApprovalsPage() {
  const [expenses, setExpenses] = useState([]);
  const [comment, setComment] = useState("");
  const [activeExpenseId, setActiveExpenseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const loadPending = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listFinanceExpenses();
      const all = res?.expenses || [];
      setExpenses(all.filter((e) => String(e.status || "").toUpperCase() === "SUBMITTED"));
    } catch (err) {
      setError(err.message || "Failed to load pending approvals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const takeDecision = async (expenseId, decision) => {
    setStatusMessage("");
    setError("");
    setActiveExpenseId(expenseId);
    try {
      await decideFinanceExpense(expenseId, { decision, comment: comment.trim() });
      setStatusMessage(`Expense ${decision.toLowerCase()} successfully.`);
      setComment("");
      await loadPending();
    } catch (err) {
      setError(err.message || "Failed to submit decision.");
    } finally {
      setActiveExpenseId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Approve Payments</h1>
          <p className="text-sm text-slate-500">Review submitted expenses and approve or reject with comment.</p>
        </div>
        <button onClick={loadPending} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      <section className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
        {statusMessage && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{statusMessage}</div>}
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={3}
          placeholder="Common comment for current action (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="space-y-3">
          {expenses.map((item) => (
            <div key={item.id} className="rounded-xl border bg-slate-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.submitted_by_name || "Unknown"} • INR {item.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => takeDecision(item.id, "APPROVED")}
                    disabled={activeExpenseId === item.id}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => takeDecision(item.id, "REJECTED")}
                    disabled={activeExpenseId === item.id}
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-70"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && expenses.length === 0 && <div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">No pending expenses for approval.</div>}
          {loading && <div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">Loading pending approvals...</div>}
        </div>
      </section>
    </div>
  );
}
