import { useEffect, useMemo, useState } from "react";
import { listClubs, listCoordinatorsByClub } from "@/api/authAPI";

export default function ExpenseOverviewPage() {
  const [clubs, setClubs] = useState([]);
  const [coordinatorCount, setCoordinatorCount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const clubsRes = await listClubs();
      const allClubs = clubsRes?.clubs || [];
      setClubs(allClubs);

      const counts = {};
      await Promise.all(
        allClubs.map(async (club) => {
          try {
            const res = await listCoordinatorsByClub(club.id);
            counts[club.id] = (res?.coordinators || []).length;
          } catch {
            counts[club.id] = 0;
          }
        })
      );
      setCoordinatorCount(counts);
    } catch (err) {
      setError(err.message || "Failed to load overview data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeClubs = useMemo(() => clubs.filter((c) => c.is_active).length, [clubs]);
  const totalCoordinators = useMemo(
    () => Object.values(coordinatorCount).reduce((sum, count) => sum + count, 0),
    [coordinatorCount]
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expense Overview</h1>
          <p className="text-sm text-slate-500">Admin-level overview of active clubs and coordinator coverage.</p>
        </div>
        <button onClick={loadData} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Total Clubs</p><p className="mt-1 text-2xl font-bold text-slate-900">{clubs.length}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Active Clubs</p><p className="mt-1 text-2xl font-bold text-emerald-700">{activeClubs}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Total Coordinators</p><p className="mt-1 text-2xl font-bold text-slate-900">{totalCoordinators}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Inactive Clubs</p><p className="mt-1 text-2xl font-bold text-amber-700">{clubs.length - activeClubs}</p></div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Club-wise Coverage</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Club</th>
                <th className="pb-2 font-medium">Code</th>
                <th className="pb-2 font-medium">Coordinators</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {clubs.map((club) => (
                <tr key={club.id} className="border-t">
                  <td className="py-2">{club.club_name || club.clubName}</td>
                  <td className="py-2">{club.club_code || club.clubCode}</td>
                  <td className="py-2">{coordinatorCount[club.id] ?? 0}</td>
                  <td className="py-2">{club.is_active ? "Active" : "Inactive"}</td>
                </tr>
              ))}
              {!loading && clubs.length === 0 && <tr><td colSpan={4} className="py-3 text-slate-500">No clubs found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
