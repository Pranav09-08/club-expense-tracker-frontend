import { useEffect, useMemo, useState } from "react";
import { listFinanceExpenses } from "@/api/authAPI";

export default function SeeExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listFinanceExpenses();
      setExpenses(res?.expenses || []);
    } catch (err) {
      setError(err.message || "Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const filtered = useMemo(() => {
    if (statusFilter === "ALL") return expenses;
    return expenses.filter((expense) => String(expense.status || "").toUpperCase() === statusFilter);
  }, [expenses, statusFilter]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">See Expenses</h1>
          <p className="text-sm text-slate-500">View all club expenses submitted by members and leads in your club.</p>
        </div>
        <button onClick={loadExpenses} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      <section className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <select
          className="w-full max-w-xs rounded-lg border bg-white px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Title</th>
                <th className="pb-2 font-medium">Submitted By</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {filtered.map((expense) => (
                <tr key={expense.id} className="border-t">
                  <td className="py-2">{expense.title}</td>
                  <td className="py-2">{expense.submitted_by_name || expense.submitted_by_email || "-"}</td>
                  <td className="py-2">{expense.category_name || expense.category_code || "-"}</td>
                  <td className="py-2">{expense.amount ? `INR ${expense.amount}` : "-"}</td>
                  <td className="py-2">{expense.status}</td>
                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={5}>No expenses found.</td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={5}>Loading expenses...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
