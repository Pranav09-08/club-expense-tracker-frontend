import { useEffect, useMemo, useState } from "react";
import { listMembers } from "@/api/authAPI";

export default function ManageMembersPage() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMembers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listMembers();
      setMembers(res?.members || []);
    } catch (err) {
      setError(err.message || "Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => {
      const name = String(m.full_name || m.fullName || "").toLowerCase();
      const email = String(m.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [members, query]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Members</h1>
          <p className="text-sm text-slate-500">View all members of your club.</p>
        </div>
        <button onClick={loadMembers} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      <section className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <input
          className="w-full max-w-md rounded-lg border px-3 py-2 text-sm"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {filtered.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="py-2">{member.full_name || member.fullName}</td>
                  <td className="py-2">{member.email}</td>
                  <td className="py-2">{member.joined_at ? new Date(member.joined_at).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={3}>No members found.</td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td className="py-3 text-slate-500" colSpan={3}>Loading members...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
