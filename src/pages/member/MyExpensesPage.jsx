import { useEffect, useMemo, useState } from "react";
import { listMemberExpenses } from "@/api/authAPI";

export default function MyExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listMemberExpenses();
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
    return expenses.filter((e) => String(e.status || "").toUpperCase() === statusFilter);
  }, [expenses, statusFilter]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Expenses</h1>
          <p className="text-sm text-slate-500">Track submission and approval status of your expenses.</p>
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
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-2">{item.title}</td>
                  <td className="py-2">{item.category_name || item.category_code || "-"}</td>
                  <td className="py-2">{item.expense_date ? new Date(item.expense_date).toLocaleDateString() : "-"}</td>
                  <td className="py-2">{item.amount ? `INR ${item.amount}` : "-"}</td>
                  <td className="py-2">{item.status}</td>
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
