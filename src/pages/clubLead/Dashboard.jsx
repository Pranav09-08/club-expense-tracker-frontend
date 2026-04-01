import { useEffect, useState } from "react";
import { createMember, listMembers } from "@/api/authAPI";

export default function Dashboard() {
  const cards = [
    { label: "Club Budget", value: "₹85,000" },
    { label: "Used Budget", value: "₹52,400" },
    { label: "Pending Requests", value: "7" },
    { label: "Approved This Month", value: "12" },
  ];

  const expenses = [
    { title: "Workshop Components", date: "29 Mar 2026", amount: "₹12,500", status: "Approved" },
    { title: "Event Posters", date: "27 Mar 2026", amount: "₹2,300", status: "Submitted" },
    { title: "Speaker Honorarium", date: "24 Mar 2026", amount: "₹8,000", status: "Approved" },
  ];

  const [activeTab, setActiveTab] = useState("create-member");
  const [members, setMembers] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [memberForm, setMemberForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const loadMembers = async () => {
    try {
      const res = await listMembers();
      setMembers(res?.members || []);
    } catch (err) {
      setErrorMessage(err.message || "Failed to load members");
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleCreateMember = async () => {
    setStatusMessage("");
    setErrorMessage("");
    try {
      await createMember({
        fullName: memberForm.fullName.trim(),
        email: memberForm.email.trim(),
        password: memberForm.password,
      });
      setStatusMessage("Member created successfully");
      setMemberForm({ fullName: "", email: "", password: "" });
      await loadMembers();
    } catch (err) {
      setErrorMessage(err.message || "Failed to create member");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Club Lead Dashboard</h1>
        <p className="text-sm text-slate-500">Track club spending, submit requests, and follow approval progress.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Expense Requests</h2>
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={`${expense.title}-${expense.date}`} className="rounded-xl border bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{expense.title}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-700 border">{expense.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{expense.date} · {expense.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Budget Health</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Remaining budget: ₹32,600</div>
            <div className="rounded-xl border bg-slate-50 p-3">Projected spend (next 2 weeks): ₹18,000</div>
            <div className="rounded-xl border bg-slate-50 p-3">Safe utilization threshold: 90%</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Add Expense</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Expense Title" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Amount (₹)" />
          <select className="rounded-lg border bg-white px-3 py-2 text-sm">
            <option>Category: Event</option>
            <option>Category: Equipment</option>
            <option>Category: Publicity</option>
          </select>
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Invoice Ref" />
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">Submit Expense</button>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: "create-member", label: "Create Member" },
            { id: "view-members", label: "View Members" },
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

        {activeTab === "create-member" && (
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Full Name"
              value={memberForm.fullName}
              onChange={(e) => setMemberForm((p) => ({ ...p, fullName: e.target.value }))}
            />
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Email"
              value={memberForm.email}
              onChange={(e) => setMemberForm((p) => ({ ...p, email: e.target.value }))}
            />
            <input
              type="password"
              className="rounded-lg border px-3 py-2 text-sm md:col-span-2"
              placeholder="Password"
              value={memberForm.password}
              onChange={(e) => setMemberForm((p) => ({ ...p, password: e.target.value }))}
            />
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={handleCreateMember}
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Create Member
              </button>
            </div>
          </div>
        )}

        {activeTab === "view-members" && (
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
                {members.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-2">{item.full_name || item.fullName}</td>
                    <td className="py-2">{item.email}</td>
                    <td className="py-2">{item.joined_at ? new Date(item.joined_at).toLocaleDateString() : "-"}</td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td className="py-3 text-slate-500" colSpan={3}>
                      No members found in your club.
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