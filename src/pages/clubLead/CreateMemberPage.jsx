import { useState } from "react";
import { createMember } from "@/api/authAPI";

export default function CreateMemberPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await createMember({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setSuccess("Member created successfully.");
      setForm({ fullName: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Failed to create member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create Member</h1>
        <p className="text-sm text-slate-500">Create members for your club using student lead permissions.</p>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        {success && <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div>}
        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={form.fullName}
              onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              placeholder="Member full name"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="member@club.in"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="Create a secure password"
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Member"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
