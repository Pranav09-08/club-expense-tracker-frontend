import { useEffect, useMemo, useState } from "react";
import { listClubs, listCoordinatorsByClub } from "@/api/authAPI";

export default function BudgetAnalysisPage() {
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
      setError(err.message || "Failed to load analysis data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const analysisRows = useMemo(() => {
    return clubs.map((club) => {
      const coordinators = coordinatorCount[club.id] || 0;
      const risk = coordinators === 0 ? "HIGH" : coordinators === 1 ? "MEDIUM" : "LOW";
      return {
        id: club.id,
        name: club.club_name || club.clubName,
        code: club.club_code || club.clubCode,
        coordinators,
        risk,
      };
    });
  }, [clubs, coordinatorCount]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Budget Analysis</h1>
          <p className="text-sm text-slate-500">Operational risk analysis based on club staffing coverage.</p>
        </div>
        <button onClick={loadData} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Club Risk Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Club</th>
                <th className="pb-2 font-medium">Code</th>
                <th className="pb-2 font-medium">Coordinator Count</th>
                <th className="pb-2 font-medium">Operational Risk</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {analysisRows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="py-2">{row.name}</td>
                  <td className="py-2">{row.code}</td>
                  <td className="py-2">{row.coordinators}</td>
                  <td className="py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        row.risk === "HIGH"
                          ? "bg-red-50 text-red-700"
                          : row.risk === "MEDIUM"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
              {!loading && analysisRows.length === 0 && <tr><td colSpan={4} className="py-3 text-slate-500">No clubs available for analysis.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
