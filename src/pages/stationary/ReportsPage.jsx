import { useEffect, useMemo, useState } from "react";
import { listStationaryRequests } from "@/api/authAPI";

export default function ReportsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listStationaryRequests();
      setRequests(res?.requests || []);
    } catch (err) {
      setError(err.message || "Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const byStatus = useMemo(() => {
    return requests.reduce((acc, req) => {
      const key = String(req.status || "UNKNOWN");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [requests]);

  const totalFinalAmount = useMemo(
    () => requests.reduce((sum, req) => sum + Number(req.final_amount || 0), 0),
    [requests]
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Usage Reports</h1>
          <p className="text-sm text-slate-500">Status and spend analytics for stationary requests.</p>
        </div>
        <button onClick={loadData} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Total Requests</p><p className="mt-1 text-2xl font-bold text-slate-900">{requests.length}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Approved Spend</p><p className="mt-1 text-2xl font-bold text-emerald-700">INR {totalFinalAmount.toFixed(2)}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Pending</p><p className="mt-1 text-2xl font-bold text-amber-700">{byStatus.SUBMITTED || 0}</p></div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Requests by Status</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {Object.keys(byStatus).length === 0 && !loading && (
            <p className="text-sm text-slate-500">No data available.</p>
          )}
          {Object.entries(byStatus).map(([status, count]) => (
            <div key={status} className="rounded-xl border bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">{status}</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{count}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
