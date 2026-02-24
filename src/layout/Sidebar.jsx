import { getNavigation } from "../nav";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navItems = getNavigation(user?.role || "guest");
  const location = useLocation();

  const [open, setOpen] = useState(true);

  return (
    <>
      {/* 🔹 Toggle Button (always visible when closed) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg shadow-lg hover:bg-gray-800"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-black text-white flex flex-col transition-transform duration-300 z-40 ${
          open ? "translate-x-0 w-72" : "-translate-x-full w-72"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <h1 className="font-semibold text-lg">Club Expense</h1>

          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item, index) =>
            item.group ? (
              <div key={index}>
                <p className="text-xs text-gray-400 px-3 mt-4 mb-1 uppercase">
                  {item.group}
                </p>

                {item.items.map((sub, i) => {
                  const Icon = sub.icon;

                  return (
                    <Link
                      key={i}
                      to={sub.to}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        location.pathname === sub.to
                          ? "bg-white text-black"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {Icon && <Icon size={18} />}
                      <span>{sub.label}</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              (() => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                      location.pathname === item.to
                        ? "bg-white text-black"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {Icon && <Icon size={18} />}
                    <span>{item.label}</span>
                  </Link>
                );
              })()
            )
          )}
        </nav>
      </aside>
    </>
  );
}