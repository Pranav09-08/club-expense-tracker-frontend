import {
  LayoutDashboard,
  User,
  Folder,
  Users,
  BarChart3,
  FileText,
  ClipboardList,
  Wallet,
  CheckCircle,
  ShoppingCart,
  Package,
  HelpCircle,
  Phone,
  Info
} from "lucide-react";

export const getNavigation = (role) => {
  const common = [
    { label: "Help", to: "/help", icon: HelpCircle },
    { label: "Contact", to: "/contactus", icon: Phone },
    { label: "About", to: "/about-us", icon: Info },
  ];

  // 🔹 ADMIN
  if (role === "admin") {
    return [
      { label: "Dashboard", to: "/admin-dashboard", icon: LayoutDashboard },
      { label: "Profile", to: "/admin/profile", icon: User },

      {
        group: "Clubs",
        icon: Folder,
        items: [
          { label: "Add Club", to: "/admin/clubs/add", icon: ClipboardList },
          { label: "Manage Clubs", to: "/admin/clubs", icon: Folder },
        ],
      },

      {
        group: "Users",
        icon: Users,
        items: [
          { label: "Create Coordinator", to: "/admin/coordinators/add", icon: User },
          { label: "Manage Coordinators", to: "/admin/coordinators", icon: Users },
        ],
      },

      {
        group: "Reports",
        icon: BarChart3,
        items: [
          { label: "Expense Overview", to: "/admin/reports", icon: FileText },
          { label: "Budget Analysis", to: "/admin/analysis", icon: BarChart3 },
        ],
      },

      ...common,
    ];
  }

  // 🔹 COORDINATOR
  if (role === "coordinator") {
    return [
      { label: "Dashboard", to: "/coordinator-dashboard", icon: LayoutDashboard },
      { label: "Profile", to: "/coordinator/profile", icon: User },

      {
        group: "Leads",
        icon: Folder,
        items: [
          { label: "Create Lead", to: "/coordinator/leads/add", icon: ClipboardList },
          { label: "Manage Leads", to: "/coordinator/leads", icon: Users },
        ],
      },

      ...common,
    ];
  }

  // 🔹 CLUB LEAD
  if (role === "club_lead") {
    return [
      { label: "Dashboard", to: "/club-lead-dashboard", icon: LayoutDashboard },
      { label: "Profile", to: "/club-lead/profile", icon: User },

      {
        group: "Expenses",
        icon: Wallet,
        items: [
          { label: "Add Expense", to: "/club-lead/add-expense", icon: ClipboardList },
          { label: "View Expenses", to: "/club-lead/expenses", icon: FileText },
        ],
      },

      {
        group: "Requests",
        icon: CheckCircle,
        items: [
          { label: "Pending Approvals", to: "/club-lead/pending", icon: CheckCircle },
        ],
      },

      ...common,
    ];
  }

  // 🔹 FINANCE LEAD
  if (role === "finance_lead") {
    return [
      { label: "Dashboard", to: "/finance-dashboard", icon: LayoutDashboard },
      { label: "Profile", to: "/finance/profile", icon: User },

      {
        group: "Finance",
        icon: Wallet,
        items: [
          { label: "All Expenses", to: "/finance/expenses", icon: FileText },
          { label: "Approve Payments", to: "/finance/approvals", icon: CheckCircle },
        ],
      },

      {
        group: "Reports",
        icon: BarChart3,
        items: [
          { label: "Financial Reports", to: "/finance/reports", icon: BarChart3 },
        ],
      },

      ...common,
    ];
  }

  // 🔹 MEMBER
  if (role === "member") {
    return [
      { label: "Dashboard", to: "/member-dashboard", icon: LayoutDashboard },
      { label: "Profile", to: "/member/profile", icon: User },

      {
        group: "Expenses",
        icon: Wallet,
        items: [
          { label: "Submit Expense", to: "/member/add-expense", icon: ClipboardList },
          { label: "My Expenses", to: "/member/expenses", icon: FileText },
        ],
      },

      ...common,
    ];
  }

  // 🔹 STATIONARY ADMIN
  if (role === "stationary_admin") {
    return [
      { label: "Dashboard", to: "/stationary-dashboard", icon: LayoutDashboard },
      { label: "Profile", to: "/stationary/profile", icon: User },

      {
        group: "Stationary",
        icon: ShoppingCart,
        items: [
          { label: "Add Request", to: "/stationary/add-request", icon: ClipboardList },
          { label: "Manage Inventory", to: "/stationary/inventory", icon: Package },
        ],
      },

      {
        group: "Reports",
        icon: BarChart3,
        items: [
          { label: "Usage Reports", to: "/stationary/reports", icon: FileText },
        ],
      },

      ...common,
    ];
  }

  return common;
};