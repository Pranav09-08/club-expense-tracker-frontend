import { useEffect, useState } from "react";
import { createMember, listFinanceExpenses, listMembers } from "@/api/authAPI";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [clubStats, setClubStats] = useState({ members: 0, submitted: 0, approved: 0, pending: 0 });

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

  const loadExpenses = async () => {
    try {
      const res = await listFinanceExpenses();
      const allExpenses = res?.expenses || [];
      setExpenses(allExpenses);
    } catch (err) {
      setErrorMessage(err.message || "Failed to load expenses");
    }
  };

  useEffect(() => {
    setClubStats({
      members: members.length,
      submitted: expenses.filter((item) => String(item.status || "").toUpperCase() === "SUBMITTED").length,
      approved: expenses.filter((item) => String(item.status || "").toUpperCase() === "APPROVED").length,
      pending: expenses.filter((item) => String(item.status || "").toUpperCase() === "SUBMITTED").length,
    });
  }, [members, expenses]);

  useEffect(() => {
    loadMembers();
    loadExpenses();
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

  const cards = [
    { label: "Club Members", value: String(clubStats.members) },
    { label: "Submitted Expenses", value: String(clubStats.submitted) },
    { label: "Approved Expenses", value: String(clubStats.approved) },
    { label: "Pending Expenses", value: String(clubStats.pending) },
  ];

  const latestExpenses = [...expenses].slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Club Lead Dashboard</h1>
        <p className="text-sm text-slate-500">Track your club's members, expenses, and finance status in one place.</p>
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
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Club Expenses</h2>
          <div className="space-y-3">
            {latestExpenses.map((expense) => (
              <div key={expense.id} className="rounded-xl border bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{expense.title}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-700 border">{expense.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : "-"} · INR {expense.amount}
                </p>
                <p className="mt-1 text-xs text-slate-500">Submitted by: {expense.submitted_by_name || expense.submitted_by_email || "-"}</p>
              </div>
            ))}
            {latestExpenses.length === 0 && (
              <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-600">No expenses submitted yet.</div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Club Summary</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Active members: {members.length}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Expenses under review: {clubStats.pending}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Expenses approved: {clubStats.approved}</div>
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