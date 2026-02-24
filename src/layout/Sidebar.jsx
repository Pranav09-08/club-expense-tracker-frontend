import { getNavigation } from "../nav";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navItems = getNavigation(user?.role || "guest");

  return (
    <aside className="w-64 border-r bg-white">
      <div className="p-4 font-semibold text-lg">Club Expense</div>

      <nav className="space-y-1 px-2">
        {navItems.map((item, index) =>
          item.group ? (
            <div key={index}>
              <p className="text-xs text-muted-foreground px-2 mt-4">
                {item.group}
              </p>

              {item.items.map((sub, i) => (
                <Link
                  key={i}
                  to={sub.to}
                  className="block px-3 py-2 rounded-lg hover:bg-muted"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={index}
              to={item.to}
              className="block px-3 py-2 rounded-lg hover:bg-muted"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}