import { useState } from "react";
import { createClub } from "@/api/authAPI";

export default function CreateClubPage() {
  const [form, setForm] = useState({
    clubCode: "",
    clubName: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await createClub({
        clubCode: form.clubCode.trim(),
        clubName: form.clubName.trim(),
        description: form.description.trim(),
      });
      setSuccess("Club created successfully.");
      setForm({ clubCode: "", clubName: "", description: "" });
    } catch (err) {
      setError(err.message || "Failed to create club.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create Club</h1>
        <p className="text-sm text-slate-500">Create a new club with code, name, and description.</p>
      </div>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        {success && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Club Code</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="e.g. TECH_CLUB"
              value={form.clubCode}
              onChange={(e) => setForm((p) => ({ ...p, clubCode: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Club Name</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="e.g. Tech Club"
              value={form.clubName}
              onChange={(e) => setForm((p) => ({ ...p, clubName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 text-sm"
              rows={4}
              placeholder="What does this club handle?"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Club"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
