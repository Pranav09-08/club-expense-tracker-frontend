import { useState } from "react";
import { createMemberExpense } from "@/api/authAPI";

export default function SubmitExpensePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    expenseDate: "",
    categoryCode: "OTHER",
    amount: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const amount = Number(form.amount);
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        expenseDate: form.expenseDate,
        categoryCode: form.categoryCode,
        amount,
        lineItems: [
          {
            itemName: form.title.trim(),
            quantity: 1,
            unitPrice: amount,
            totalPrice: amount,
            note: form.description.trim() || "",
          },
        ],
      };

      await createMemberExpense(payload);
      setSuccess("Expense submitted successfully.");
      setForm({
        title: "",
        description: "",
        expenseDate: "",
        categoryCode: "OTHER",
        amount: "",
      });
    } catch (err) {
      setError(err.message || "Failed to submit expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Submit Expense</h1>
        <p className="text-sm text-slate-500">Create a new expense request for your club.</p>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        {success && <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div>}
        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input className="w-full rounded-lg border px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea className="w-full rounded-lg border px-3 py-2 text-sm" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Expense Date</label>
            <input type="date" className="w-full rounded-lg border px-3 py-2 text-sm" value={form.expenseDate} onChange={(e) => setForm((p) => ({ ...p, expenseDate: e.target.value }))} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select className="w-full rounded-lg border bg-white px-3 py-2 text-sm" value={form.categoryCode} onChange={(e) => setForm((p) => ({ ...p, categoryCode: e.target.value }))}>
              <option value="TRAVEL">Travel</option>
              <option value="FOOD">Food</option>
              <option value="DECORATION">Decoration</option>
              <option value="STATIONARY">Stationary</option>
              <option value="EQUIPMENT">Equipment</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Amount (INR)</label>
            <input type="number" min="1" step="0.01" className="w-full rounded-lg border px-3 py-2 text-sm" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} required />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" disabled={loading} className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Submitting..." : "Submit Expense"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
