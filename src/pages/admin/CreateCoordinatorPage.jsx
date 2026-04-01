import { useEffect, useState } from "react";
import { createCoordinator, listClubs } from "@/api/authAPI";

export default function CreateCoordinatorPage() {
  const [clubs, setClubs] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    clubId: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await listClubs();
        const allClubs = res?.clubs || [];
        setClubs(allClubs);
        if (allClubs.length > 0) {
          setForm((prev) => ({ ...prev, clubId: String(allClubs[0].id) }));
        }
      } catch (err) {
        setError(err.message || "Failed to load clubs.");
      }
    };

    fetchClubs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await createCoordinator({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        clubId: Number(form.clubId),
      });
      setSuccess("Coordinator created successfully.");
      setForm((prev) => ({ ...prev, fullName: "", email: "", password: "" }));
    } catch (err) {
      setError(err.message || "Failed to create coordinator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create Coordinator</h1>
        <p className="text-sm text-slate-500">
          Step 2 in your flow: assign a coordinator to an existing club.
        </p>
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
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Coordinator full name"
              value={form.fullName}
              onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="coordinator@club.in"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Create a secure password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Club</label>
            <select
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
              value={form.clubId}
              onChange={(e) => setForm((p) => ({ ...p, clubId: e.target.value }))}
              required
            >
              <option value="">Select Club</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.club_name || club.clubName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading || clubs.length === 0}
              className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Coordinator"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
