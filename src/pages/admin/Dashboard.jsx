import { useEffect, useState } from "react";
import {
  createClub,
  createCoordinator,
  listClubs,
  listCoordinatorsByClub,
} from "@/api/authAPI";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("create-club");
  const [clubs, setClubs] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [clubForm, setClubForm] = useState({
    clubCode: "",
    clubName: "",
    description: "",
  });

  const [coordinatorForm, setCoordinatorForm] = useState({
    fullName: "",
    email: "",
    password: "",
    clubId: "",
  });

  const loadClubs = async () => {
    try {
      const res = await listClubs();
      const allClubs = res?.clubs || [];
      setClubs(allClubs);

      if (!selectedClubId && allClubs.length > 0) {
        const firstClubId = String(allClubs[0].id);
        setSelectedClubId(firstClubId);
        setCoordinatorForm((prev) => ({ ...prev, clubId: firstClubId }));
      }
    } catch (err) {
      setErrorMessage(err.message || "Failed to load clubs");
    }
  };

  const loadCoordinators = async (clubId) => {
    if (!clubId) return;
    try {
      const res = await listCoordinatorsByClub(clubId);
      setCoordinators(res?.coordinators || []);
    } catch (err) {
      setErrorMessage(err.message || "Failed to load coordinators");
    }
  };

  useEffect(() => {
    loadClubs();
  }, []);

  useEffect(() => {
    if (selectedClubId) {
      loadCoordinators(selectedClubId);
    }
  }, [selectedClubId]);

  const coordinatorCount = coordinators.length;
  const activeClubs = clubs.filter((club) => club.is_active).length;
  const clubsWithoutCoordinators = clubs.filter((club) => {
    return String(club.id) === String(selectedClubId) ? coordinators.length === 0 : false;
  }).length;

  const stats = [
    { label: "Total Clubs", value: String(clubs.length) },
    { label: "Active Clubs", value: String(activeClubs) },
    { label: "Selected Club Coordinators", value: String(coordinatorCount) },
    { label: "Empty Club Assignments", value: String(clubsWithoutCoordinators) },
  ];

  const recentClubs = [...clubs].slice(0, 3);

  const handleCreateClub = async () => {
    setErrorMessage("");
    setStatusMessage("");
    try {
      await createClub({
        clubCode: clubForm.clubCode.trim(),
        clubName: clubForm.clubName.trim(),
        description: clubForm.description.trim(),
      });
      setStatusMessage("Club created successfully");
      setClubForm({ clubCode: "", clubName: "", description: "" });
      await loadClubs();
    } catch (err) {
      setErrorMessage(err.message || "Failed to create club");
    }
  };

  const handleCreateCoordinator = async () => {
    setErrorMessage("");
    setStatusMessage("");
    try {
      await createCoordinator({
        fullName: coordinatorForm.fullName.trim(),
        email: coordinatorForm.email.trim(),
        password: coordinatorForm.password,
        clubId: Number(coordinatorForm.clubId),
      });
      setStatusMessage("Coordinator created successfully");
      setCoordinatorForm((prev) => ({ ...prev, fullName: "", email: "", password: "" }));
      await loadCoordinators(coordinatorForm.clubId);
    } catch (err) {
      setErrorMessage(err.message || "Failed to create coordinator");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500">Monitor clubs, users, and expense approval flow across the platform.</p>
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
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Clubs</h2>
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
                {recentClubs.map((club) => (
                  <tr key={club.id} className="border-t">
                    <td className="py-2">{club.club_name || club.clubName}</td>
                    <td className="py-2">{club.club_code || club.clubCode}</td>
                    <td className="py-2">{String(club.id) === String(selectedClubId) ? coordinatorCount : 0}</td>
                    <td className="py-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${club.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {club.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
                {!recentClubs.length && (
                  <tr>
                    <td className="py-3 text-slate-500" colSpan={4}>No clubs available yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Club Focus</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Selected club coordinators: {coordinatorCount}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Active clubs: {activeClubs}</div>
            <div className="rounded-xl border bg-slate-50 p-3">Empty club assignments: {clubsWithoutCoordinators}</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Club Coverage</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Total Clubs</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{clubs.length}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Active Clubs</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{activeClubs}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium text-slate-700">Selected Club Coordinators</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{coordinatorCount}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: "create-club", label: "Create Club" },
            { id: "create-coordinator", label: "Create Coordinator" },
            { id: "view-coordinators", label: "View Coordinators" },
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

        {activeTab === "create-club" && (
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Club Code (e.g. TECH_CLUB)"
              value={clubForm.clubCode}
              onChange={(e) => setClubForm((p) => ({ ...p, clubCode: e.target.value }))}
            />
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Club Name"
              value={clubForm.clubName}
              onChange={(e) => setClubForm((p) => ({ ...p, clubName: e.target.value }))}
            />
            <textarea
              className="rounded-lg border px-3 py-2 text-sm md:col-span-2"
              placeholder="Description"
              value={clubForm.description}
              onChange={(e) => setClubForm((p) => ({ ...p, description: e.target.value }))}
            />
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={handleCreateClub}
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Create Club
              </button>
            </div>
          </div>
        )}

        {activeTab === "create-coordinator" && (
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Full Name"
              value={coordinatorForm.fullName}
              onChange={(e) => setCoordinatorForm((p) => ({ ...p, fullName: e.target.value }))}
            />
            <input
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Email"
              value={coordinatorForm.email}
              onChange={(e) => setCoordinatorForm((p) => ({ ...p, email: e.target.value }))}
            />
            <input
              type="password"
              className="rounded-lg border px-3 py-2 text-sm"
              placeholder="Password"
              value={coordinatorForm.password}
              onChange={(e) => setCoordinatorForm((p) => ({ ...p, password: e.target.value }))}
            />
            <select
              className="rounded-lg border bg-white px-3 py-2 text-sm"
              value={coordinatorForm.clubId}
              onChange={(e) => {
                setCoordinatorForm((p) => ({ ...p, clubId: e.target.value }));
                setSelectedClubId(e.target.value);
              }}
            >
              <option value="">Select Club</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.club_name || club.clubName}
                </option>
              ))}
            </select>
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={handleCreateCoordinator}
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Create Coordinator
              </button>
            </div>
          </div>
        )}

        {activeTab === "view-coordinators" && (
          <div className="space-y-3">
            <div className="max-w-sm">
              <select
                className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
              >
                <option value="">Select Club</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.club_name || club.clubName}
                  </option>
                ))}
              </select>
            </div>

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
                  {coordinators.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-2">{item.full_name || item.fullName}</td>
                      <td className="py-2">{item.email}</td>
                      <td className="py-2">{item.joined_at ? new Date(item.joined_at).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                  {coordinators.length === 0 && (
                    <tr>
                      <td className="py-3 text-slate-500" colSpan={3}>
                        No coordinators found for selected club.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}