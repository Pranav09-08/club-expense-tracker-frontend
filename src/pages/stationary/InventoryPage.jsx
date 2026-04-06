import { useEffect, useMemo, useState } from "react";
import { listStationaryRequests } from "@/api/authAPI";

export default function InventoryPage() {
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
      setError(err.message || "Failed to load inventory data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const summary = useMemo(() => {
    return requests.reduce(
      (acc, req) => {
        const status = String(req.status || "").toUpperCase();
        acc.total += 1;
        if (status === "SUBMITTED") acc.submitted += 1;
        if (status === "APPROVED") acc.approved += 1;
        if (status === "REJECTED") acc.rejected += 1;
        if (req.final_amount) acc.procuredValue += Number(req.final_amount);
        return acc;
      },
      { total: 0, submitted: 0, approved: 0, rejected: 0, procuredValue: 0 }
    );
  }, [requests]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Inventory</h1>
          <p className="text-sm text-slate-500">Operational view derived from stationary request pipeline.</p>
        </div>
        <button onClick={loadData} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Total Requests</p><p className="mt-1 text-2xl font-bold text-slate-900">{summary.total}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Submitted</p><p className="mt-1 text-2xl font-bold text-amber-700">{summary.submitted}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Approved</p><p className="mt-1 text-2xl font-bold text-emerald-700">{summary.approved}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Rejected</p><p className="mt-1 text-2xl font-bold text-red-700">{summary.rejected}</p></div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-500">Procured Value</p><p className="mt-1 text-2xl font-bold text-slate-900">INR {summary.procuredValue.toFixed(2)}</p></div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Title</th>
                <th className="pb-2 font-medium">Requested By</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Final Amount</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {requests.slice(0, 8).map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="py-2">{req.request_title}</td>
                  <td className="py-2">{req.requested_by_name || "-"}</td>
                  <td className="py-2">{req.status}</td>
                  <td className="py-2">{req.final_amount ? `INR ${req.final_amount}` : "-"}</td>
                </tr>
              ))}
              {!loading && requests.length === 0 && <tr><td colSpan={4} className="py-3 text-slate-500">No requests available.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
