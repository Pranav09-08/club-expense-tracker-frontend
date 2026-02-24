export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4 bg-white">Card 1</div>
        <div className="border rounded-xl p-4 bg-white">Card 2</div>
        <div className="border rounded-xl p-4 bg-white">Card 3</div>
      </div>
    </div>
  );
}