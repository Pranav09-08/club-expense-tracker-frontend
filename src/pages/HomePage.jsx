import { Link } from "react-router-dom";
import { BarChart3, ShieldCheck, Users, Wallet } from "lucide-react";

export default function HomePage() {
  const highlights = [
    { label: "Total Clubs", value: "18", icon: Users },
    { label: "Monthly Expenses", value: "₹2.47L", icon: Wallet },
    { label: "Pending Approvals", value: "26", icon: ShieldCheck },
    { label: "Reports Generated", value: "132", icon: BarChart3 },
  ];

  const features = [
    {
      title: "Role-based Dashboards",
      description: "Dedicated workflows for admin, coordinator, finance lead, club lead, members, and stationary team.",
    },
    {
      title: "Expense Transparency",
      description: "Track requests, approvals, and payouts with clear status progression and audit-friendly records.",
    },
    {
      title: "Operational Reports",
      description: "Monitor budget utilization, monthly trends, and club-wise spending from one centralized system.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-8 sm:px-8 lg:px-12">
      <div className="flex w-full flex-col justify-between gap-8">
        <section className="grid w-full items-center gap-8 lg:grid-cols-2">
          <div className="space-y-4 animate-in fade-in duration-500">
            <p className="inline-flex bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 animate-in slide-in-from-top-2 duration-500">
              Smart Club Finance Management
            </p>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-tight tracking-tight text-slate-900 animate-in slide-in-from-left-3 duration-500">
              Club Expense Tracker
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 animate-in fade-in duration-700 lg:text-2xl">
              Manage approvals, reimbursements, stationery requests, and club budgets with one clean and transparent workflow.
            </p>
            <div className="flex flex-wrap gap-3 animate-in slide-in-from-bottom-2 duration-700">
              <Link
                to="/login"
                className="bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Login to Dashboard
              </Link>
              <Link
                to="/about"
                className="bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-in fade-in duration-700">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white/60 p-4 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-700">
                    <Icon size={18} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                  <p className="text-sm text-slate-500">{item.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid w-full gap-4 md:grid-cols-3 animate-in fade-in duration-700">
          {features.map((feature) => (
            <article key={feature.title} className="bg-white/50 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
              <h2 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h2>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}