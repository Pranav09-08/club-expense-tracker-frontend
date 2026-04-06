import { useEffect, useState } from "react";
import { createLead, listLeads } from "@/api/authAPI";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const activeClubId = user?.activeClubId;

  const [activeTab, setActiveTab] = useState("create-lead");
  const [leads, setLeads] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    email: "",
    password: "",
    roleCode: "STUDENT_LEAD",
  });

  const loadLeads = async () => {
    try {
      const res = await listLeads();
      setLeads(res?.leads || []);
    } catch (err) {
      setErrorMessage(err.message || "Failed to load leads");
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleCreateLead = async () => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      await createLead({
        fullName: leadForm.fullName.trim(),
        email: leadForm.email.trim(),
        password: leadForm.password,
        roleCode: leadForm.roleCode,
      });
      setStatusMessage("Lead created successfully");
      setLeadForm((p) => ({ ...p, fullName: "", email: "", password: "" }));
      await loadLeads();
    } catch (err) {
      setErrorMessage(err.message || "Failed to create lead");
    }
  };

  const studentLeads = leads.filter(
    (lead) => (lead.role_code || lead.roleCode) === "STUDENT_LEAD"
  );
  const financeLeads = leads.filter(
    (lead) => (lead.role_code || lead.roleCode) === "FINANCE_LEAD"
  );
  const latestLeads = [...leads]
    .sort((a, b) => {
      const aTime = a.joined_at ? new Date(a.joined_at).getTime() : 0;
      const bTime = b.joined_at ? new Date(b.joined_at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5);

  const kpis = [
    { label: "Active Club", value: activeClubId ? `Club #${activeClubId}` : "Not selected" },
    { label: "Total Leads", value: String(leads.length) },
    { label: "Student Leads", value: String(studentLeads.length) },
    { label: "Finance Leads", value: String(financeLeads.length) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Faculty Coordinator Dashboard</h1>
        <p className="text-sm text-slate-500">
          Club-scoped control center for your assigned club: create leads, review lead structure, and monitor role distribution.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Latest Leads in Your Club</h2>
          <div className="space-y-3">
            {latestLeads.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.full_name || item.fullName}</p>
                  <p className="text-sm text-slate-600">{item.email}</p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-700 border">
                  {item.role_code || item.roleCode}
                </span>
              </div>
            ))}
            {latestLeads.length === 0 && (
              <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-600">
                No leads created yet for this club.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Coordinator Focus</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Ensure at least one Student Lead is active</div>
            <div className="rounded-xl border bg-slate-50 p-3">Ensure at least one Finance Lead is active</div>
            <div className="rounded-xl border bg-slate-50 p-3">Review new lead accounts weekly</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Lead Role Distribution</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Student Lead Coverage</p>
            <p className="text-xs text-slate-500">In your active club</p>
            <p className="text-lg font-bold text-slate-900">{studentLeads.length}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Finance Lead Coverage</p>
            <p className="text-xs text-slate-500">In your active club</p>
            <p className="text-lg font-bold text-slate-900">{financeLeads.length}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: "create-lead", label: "Create Lead" },
            { id: "view-leads", label: "View Leads" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "border bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {statusMessage && (
          <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {statusMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {activeTab === "create-lead" && (
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Full Name"
              value={leadForm.fullName}
              onChange={(e) => setLeadForm((p) => ({ ...p, fullName: e.target.value }))}
            />
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Email"
              value={leadForm.email}
              onChange={(e) => setLeadForm((p) => ({ ...p, email: e.target.value }))}
            />
            <input
              type="password"
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Password"
              value={leadForm.password}
              onChange={(e) => setLeadForm((p) => ({ ...p, password: e.target.value }))}
            />
            <select
              className="rounded-lg border bg-white px-3 py-2 text-sm"
              value={leadForm.roleCode}
              onChange={(e) => setLeadForm((p) => ({ ...p, roleCode: e.target.value }))}
            >
              <option value="STUDENT_LEAD">Student Lead</option>
              <option value="FINANCE_LEAD">Finance Lead</option>
            </select>
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={handleCreateLead}
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Create Lead
              </button>
            </div>
          </div>
        )}

        {activeTab === "view-leads" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Role</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {leads.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-2">{item.full_name || item.fullName}</td>
                    <td className="py-2">{item.email}</td>
                    <td className="py-2">{item.role_code || item.roleCode}</td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td className="py-3 text-slate-500" colSpan={3}>
                      No leads found in your club.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}