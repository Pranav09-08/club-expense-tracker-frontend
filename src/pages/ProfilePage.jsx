export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500">Manage your account details, club role information, and contact preferences.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{user?.role || "Guest"}</p>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Primary Email</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{user?.email || "not set"}</p>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Last Login</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">Today, 09:42 AM</p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Personal Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input defaultValue="Shreyas Kulkarni" className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input defaultValue="+91 98765 43210" className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Department</label>
            <input defaultValue="Computer Engineering" className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Academic Year</label>
            <input defaultValue="Third Year" className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Club Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Assigned Club</label>
            <input defaultValue="Robotics Club" className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Designation</label>
            <input defaultValue="Operations Coordinator" className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Save Changes
        </button>
      </div>
    </div>
  );
}