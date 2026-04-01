import { useEffect, useMemo, useState } from "react";
import { listClubs, listCoordinatorsByClub } from "@/api/authAPI";

export default function ManageClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listClubs();
      const allClubs = res?.clubs || [];
      setClubs(allClubs);

      const coordinatorCounts = {};
      await Promise.all(
        allClubs.map(async (club) => {
          try {
            const coordinatorsRes = await listCoordinatorsByClub(club.id);
            coordinatorCounts[club.id] = (coordinatorsRes?.coordinators || []).length;
          } catch {
            coordinatorCounts[club.id] = 0;
          }
        })
      );
      setCounts(coordinatorCounts);
    } catch (err) {
      setError(err.message || "Failed to load clubs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredClubs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clubs;
    return clubs.filter((club) => {
      const code = String(club.club_code || club.clubCode || "").toLowerCase();
      const name = String(club.club_name || club.clubName || "").toLowerCase();
      return code.includes(q) || name.includes(q);
    });
  }, [clubs, query]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Clubs</h1>
          <p className="text-sm text-slate-500">View all clubs and coordinator assignments.</p>
        </div>
        <button
          onClick={loadData}
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

        <div className="max-w-md">
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Search by club name or code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Club Code</th>
                <th className="pb-2 font-medium">Club Name</th>
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Coordinators</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {filteredClubs.map((club) => (
                <tr key={club.id} className="border-t">
                  <td className="py-2 font-medium">{club.club_code || club.clubCode}</td>
                  <td className="py-2">{club.club_name || club.clubName}</td>
                  <td className="py-2">{club.description || "-"}</td>
                  <td className="py-2">{counts[club.id] ?? 0}</td>
                  <td className="py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        club.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {club.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}

              {!loading && filteredClubs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-3 text-slate-500">
                    No clubs found.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan={5} className="py-3 text-slate-500">
                    Loading clubs...
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
