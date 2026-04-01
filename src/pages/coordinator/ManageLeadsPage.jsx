import { useEffect, useMemo, useState } from "react";
import { listLeads } from "@/api/authAPI";

export default function ManageLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const loadLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listLeads();
      setLeads(res?.leads || []);
    } catch (err) {
      setError(err.message || "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const role = String(lead.role_code || lead.roleCode || "").toUpperCase();
      const roleMatch = roleFilter === "ALL" || role === roleFilter;
      if (!roleMatch) return false;
      if (!q) return true;
      const name = String(lead.full_name || lead.fullName || "").toLowerCase();
      const email = String(lead.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [leads, query, roleFilter]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Leads</h1>
          <p className="text-sm text-slate-500">View Student Leads and Finance Leads in your club.</p>
        </div>
        <button
          onClick={loadLeads}
          className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      <section className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT_LEAD">Student Lead</option>
            <option value="FINANCE_LEAD">Finance Lead</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t">
                  <td className="py-2">{lead.full_name || lead.fullName}</td>
                  <td className="py-2">{lead.email}</td>
                  <td className="py-2">{lead.role_code || lead.roleCode}</td>
                  <td className="py-2">{lead.joined_at ? new Date(lead.joined_at).toLocaleDateString() : "-"}</td>
                </tr>
              ))}

              {!loading && filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-3 text-slate-500">
                    No leads found.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan={4} className="py-3 text-slate-500">
                    Loading leads...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
