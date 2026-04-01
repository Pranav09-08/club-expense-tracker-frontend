import { Button } from "@/components/ui/button";

export default function Topbar({ sidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header
      className={`h-16 bg-black text-white flex items-center justify-between border-b border-white/10 transition-all duration-300 px-6 ${
        !sidebarOpen ? "pl-16 sm:pl-20" : ""
      }`}
    >
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">{user?.email}</span>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}