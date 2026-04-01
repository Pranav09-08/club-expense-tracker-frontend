import { Button } from "@/components/ui/button";
import { logout } from "@/api/authAPI";

export default function Topbar({ sidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <header
      className={`h-16 bg-slate-950 text-white flex items-center justify-between border-b border-white/10 transition-all duration-300 px-6 ${
        !sidebarOpen ? "pl-16 sm:pl-20" : ""
      }`}
    >
      <h1 className="text-lg font-semibold">Club Expense Tracker</h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-slate-400">Logged in as</p>
          <p className="text-sm text-slate-200">{user?.email || "guest"}</p>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}