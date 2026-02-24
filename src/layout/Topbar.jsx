import { Button } from "@/components/ui/button";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="flex items-center justify-between border-b p-4 bg-white">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {user?.email}
        </span>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}