export default function Dashboard() {
  const stats = [
    { label: "Open Requests", value: "13" },
    { label: "Items in Stock", value: "162" },
    { label: "Low Stock Alerts", value: "5" },
    { label: "Monthly Usage", value: "₹37,400" },
  ];

  const inventory = [
    { item: "A4 Paper Reams", inStock: "42", threshold: "30" },
    { item: "Whiteboard Markers", inStock: "18", threshold: "20" },
    { item: "Ink Cartridges", inStock: "7", threshold: "10" },
  ];

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
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Inventory Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2 font-medium">Item</th>
                  <th className="pb-2 font-medium">In Stock</th>
                  <th className="pb-2 font-medium">Threshold</th>
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
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Procurement Alerts</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border bg-slate-50 p-3">Markers below threshold by 2 units</div>
            <div className="rounded-xl border bg-slate-50 p-3">Ink cartridges reorder suggested this week</div>
            <div className="rounded-xl border bg-slate-50 p-3">Bulk paper purchase scheduled on Friday</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">New Stationary Request</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Club Name" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Requested By" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Item Name" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Quantity" />
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">Create Request</button>
        </div>
      </section>
    </div>
  );
}