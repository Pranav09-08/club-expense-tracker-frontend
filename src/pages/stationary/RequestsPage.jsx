import { useEffect, useState } from "react";
import { decideStationaryRequest, listStationaryRequests } from "@/api/authAPI";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [decisionComment, setDecisionComment] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
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

  const handleDecision = async (requestId, decision) => {
    setStatusMessage("");
    setError("");
    setActiveId(requestId);
    try {
      await decideStationaryRequest(requestId, {
        decision,
        comment: decisionComment.trim(),
      });
      setStatusMessage(`Request ${decision.toLowerCase()} successfully.`);
      setDecisionComment("");
      await loadRequests();
    } catch (err) {
      setError(err.message || "Failed to submit decision.");
    } finally {
      setActiveId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Stationary Requests</h1>
          <p className="text-sm text-slate-500">Review and decide stationary requests submitted by members.</p>
        </div>
        <button onClick={loadRequests} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Refresh</button>
      </div>

      <section className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
        {statusMessage && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{statusMessage}</div>}
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={3}
          placeholder="Comment for next decision (optional)"
          value={decisionComment}
          onChange={(e) => setDecisionComment(e.target.value)}
        />

        <div className="space-y-3">
          {requests.map((item) => (
            <div key={item.id} className="rounded-xl border bg-slate-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.request_title}</p>
                  <p className="text-sm text-slate-600">{item.requested_by_name || "Unknown"} • {item.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(item.id, "APPROVED")}
                    disabled={activeId === item.id}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-70"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(item.id, "REJECTED")}
                    disabled={activeId === item.id}
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-70"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && requests.length === 0 && <div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">No requests found.</div>}
          {loading && <div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">Loading requests...</div>}
        </div>
      </section>
    </div>
  );
}
