export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
        <p className="text-sm text-slate-500">Reach the operations or finance support team for account and request-related help.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Send a Message</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="name@club.in" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <select className="w-full rounded-lg border bg-white px-3 py-2 text-sm">
                <option>Admin</option>
                <option>Coordinator</option>
                <option>Club Lead</option>
                <option>Finance Lead</option>
                <option>Member</option>
                <option>Stationary Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Subject</label>
              <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Approval delay / Login issue / Other" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Message</label>
              <textarea rows={5} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Describe your issue in detail..." />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Submit Query
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Support Email</h3>
            <p className="mt-1 text-sm text-slate-600">support@clubtracker.in</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Helpline</h3>
            <p className="mt-1 text-sm text-slate-600">+91 20 4000 1122</p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Office Hours</h3>
            <p className="mt-1 text-sm text-slate-600">Mon - Fri, 9:30 AM - 6:30 PM</p>
          </div>
        </section>
      </div>
    </div>
  );
}