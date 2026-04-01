import { useEffect, useMemo, useState } from "react";
import { listClubs, listCoordinatorsByClub } from "@/api/authAPI";

export default function ManageCoordinatorsPage() {
  const [clubs, setClubs] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const loadClubs = async () => {
    setError("");
    try {
      const res = await listClubs();
      const allClubs = res?.clubs || [];
      setClubs(allClubs);
      if (!selectedClubId && allClubs.length > 0) {
        setSelectedClubId(String(allClubs[0].id));
      }
    } catch (err) {
      setError(err.message || "Failed to load clubs.");
    }
  };

  const loadCoordinators = async (clubId) => {
    if (!clubId) {
      setCoordinators([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await listCoordinatorsByClub(clubId);
      setCoordinators(res?.coordinators || []);
    } catch (err) {
      setError(err.message || "Failed to load coordinators.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClubs();
  }, []);

  useEffect(() => {
    if (selectedClubId) {
      loadCoordinators(selectedClubId);
    }
  }, [selectedClubId]);

  const filteredCoordinators = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coordinators;
    return coordinators.filter((c) => {
      const name = String(c.full_name || c.fullName || "").toLowerCase();
      const email = String(c.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [coordinators, query]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Coordinators</h1>
          <p className="text-sm text-slate-500">View coordinators assigned to each club.</p>
        </div>
        <button
          onClick={() => {
            loadClubs();
            if (selectedClubId) loadCoordinators(selectedClubId);
          }}
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Select Club</label>
            <select
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
              value={selectedClubId}
              onChange={(e) => setSelectedClubId(e.target.value)}
            >
              <option value="">Select Club</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.club_name || club.clubName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Search Coordinator</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Search by name or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

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
              {filteredCoordinators.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-2">{item.full_name || item.fullName}</td>
                  <td className="py-2">{item.email}</td>
                  <td className="py-2">{item.joined_at ? new Date(item.joined_at).toLocaleDateString() : "-"}</td>
                </tr>
              ))}

              {!loading && filteredCoordinators.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-3 text-slate-500">
                    No coordinators found for selected club.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan={3} className="py-3 text-slate-500">
                    Loading coordinators...
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
