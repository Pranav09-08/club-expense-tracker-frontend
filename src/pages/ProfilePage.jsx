import { useEffect, useState } from "react";
import { getCurrentUser, mapRoleCodeToRouteRole } from "@/api/authAPI";

export default function ProfilePage() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(storedUser || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getCurrentUser();
        const activeRoleCode = res?.tokenContext?.activeRole || storedUser?.roleCode || storedUser?.role;
        const activeRole = mapRoleCodeToRouteRole(activeRoleCode);
        setProfile({
          ...storedUser,
          ...res?.user,
          roleCode: activeRole,
          role: activeRole,
          activeClubId: res?.tokenContext?.activeClubId ?? storedUser?.activeClubId ?? null,
          roles: res?.roles || storedUser?.availableRoles || [],
          status: res?.user?.status,
        });
      } catch {
        setProfile(storedUser || {});
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const role = profile?.role || profile?.roleCode || "guest";
  const isCoordinator = role === "coordinator";

  const roleLabels = {
    admin: "Admin",
    coordinator: "Faculty Coordinator",
    club_lead: "Student Lead",
    finance_lead: "Finance Lead",
    member: "Member",
    stationary_admin: "Stationary Admin",
  };

  const displayRole = roleLabels[role] || "Guest";
  const displayName = profile?.fullName || profile?.full_name || "Not provided";
  const displayDesignation = isCoordinator
    ? "Faculty Coordinator"
    : role === "club_lead"
      ? "Student Lead"
      : role === "finance_lead"
        ? "Finance Lead"
        : role === "member"
          ? "Member"
          : "Operations Coordinator";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{isCoordinator ? "Faculty Profile" : "Profile"}</h1>
        <p className="text-sm text-slate-500">Manage your account details, club role information, and contact preferences.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{displayRole}</p>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Primary Email</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{profile?.email || "Not provided"}</p>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account Status</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{profile?.status || "Not provided"}</p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Personal Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input defaultValue={displayName} className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input value={profile?.phone || "Not provided"} readOnly className="w-full rounded-lg border px-3 py-2 text-sm bg-slate-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Department</label>
            <input value={profile?.department || (isCoordinator ? "Faculty Affairs" : "Not provided")} readOnly className="w-full rounded-lg border px-3 py-2 text-sm bg-slate-50" />
          </div>
          {!isCoordinator && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Academic Year</label>
              <input value={profile?.academicYear || "Not provided"} readOnly className="w-full rounded-lg border px-3 py-2 text-sm bg-slate-50" />
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Club Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Assigned Club</label>
            <input value={profile?.clubName || profile?.activeClubId || "Not provided"} readOnly className="w-full rounded-lg border px-3 py-2 text-sm bg-slate-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Designation</label>
            <input value={displayDesignation} readOnly className="w-full rounded-lg border px-3 py-2 text-sm bg-slate-50" />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button disabled className="rounded-lg bg-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 cursor-not-allowed">
          Profile data is read-only until update API is available
        </button>
      </div>
    </div>
  );
}