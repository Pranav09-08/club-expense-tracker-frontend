import { useEffect, useMemo, useState } from "react";
import { listStationaryRequests } from "@/api/authAPI";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listStationaryRequests();
      setRequests(res?.requests || []);
    } catch (err) {
      setError(err.message || "Failed to load stationary requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const stats = useMemo(() => {
    const submitted = requests.filter((item) => String(item.status || "").toUpperCase() === "SUBMITTED").length;
    const approved = requests.filter((item) => String(item.status || "").toUpperCase() === "APPROVED").length;
    const rejected = requests.filter((item) => String(item.status || "").toUpperCase() === "REJECTED").length;
    const procured = requests.reduce((sum, item) => sum + Number(item.final_amount || 0), 0);

    return [
      { label: "Open Requests", value: String(submitted) },
      { label: "Approved Requests", value: String(approved) },
      { label: "Low Stock Alerts", value: String(rejected) },
      { label: "Monthly Usage", value: `INR ${procured.toFixed(2)}` },
    ];
  }, [requests]);

  const inventory = useMemo(
    () => requests.slice(0, 5).map((request) => ({
      item: request.request_title,
      inStock: request.final_amount ? `INR ${request.final_amount}` : "Pending",
      threshold: request.status,
    })),
    [requests]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Stationary Dashboard</h1>
        <p className="text-sm text-slate-500">Track inventory, process club requests, and manage procurement planning.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Request Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2 font-medium">Request</th>
                  <th className="pb-2 font-medium">Amount / Value</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {inventory.map((row) => (
                  <tr key={row.item} className="border-t">
                    <td className="py-2">{row.item}</td>
                    <td className="py-2">{row.inStock}</td>
                    <td className="py-2">{row.threshold}</td>
                  </tr>
                ))}
                {!loading && inventory.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-3 text-slate-500">No stationary requests available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Procurement Alerts</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Submitted requests: {stats[0].value}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Approved requests: {stats[1].value}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Rejected requests: {stats[2].value}</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Latest Stationary Requests</h2>
        <div className="space-y-3">
          {requests.slice(0, 4).map((item) => (
            <div key={item.id} className="rounded-xl border bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.request_title}</p>
                  <p className="text-xs text-slate-500">{item.requested_by_name || item.requested_by_email || "-"}</p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-700 border">{item.status}</span>
              </div>
            </div>
          ))}
          {!loading && requests.length === 0 && <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-600">No requests available.</div>}
        </div>
      </section>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
    </div>
  );
}