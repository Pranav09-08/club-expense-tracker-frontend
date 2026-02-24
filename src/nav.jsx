export const getNavigation = (role) => {
  const common = [
    { label: "Help", to: "/help" },
    { label: "Contact", to: "/contactus" },
    { label: "About", to: "/about-us" },
  ];

  // 🔹 ADMIN
  if (role === "admin") {
    return [
      { label: "Dashboard", to: "/admin-dashboard" },
      { label: "Profile", to: "/admin/profile" },

      {
        group: "Clubs",
        items: [
          { label: "Add Club", to: "/admin/clubs/add" },
          { label: "Manage Clubs", to: "/admin/clubs" },
        ],
      },

      {
        group: "Users",
        items: [
          { label: "Add User", to: "/admin/users/add" },
          { label: "Manage Users", to: "/admin/users" },
        ],
      },

      {
        group: "Reports",
        items: [
          { label: "Expense Overview", to: "/admin/reports" },
          { label: "Budget Analysis", to: "/admin/analysis" },
        ],
      },

      ...common,
    ];
  }

  // 🔹 CLUB COORDINATOR (Faculty)
  if (role === "coordinator") {
    return [
      { label: "Dashboard", to: "/coordinator-dashboard" },
      { label: "Profile", to: "/coordinator/profile" },

      {
        group: "Clubs",
        items: [
          { label: "My Clubs", to: "/coordinator/clubs" },
          { label: "Approve Expenses", to: "/coordinator/approvals" },
        ],
      },

      {
        group: "Reports",
        items: [
          { label: "Club Reports", to: "/coordinator/reports" },
        ],
      },

      ...common,
    ];
  }

  // 🔹 CLUB LEAD (Student)
  if (role === "club_lead") {
    return [
      { label: "Dashboard", to: "/club-lead-dashboard" },
      { label: "Profile", to: "/club-lead/profile" },

      {
        group: "Expenses",
        items: [
          { label: "Add Expense", to: "/club-lead/add-expense" },
          { label: "View Expenses", to: "/club-lead/expenses" },
        ],
      },

      {
        group: "Requests",
        items: [
          { label: "Pending Approvals", to: "/club-lead/pending" },
        ],
      },

      ...common,
    ];
  }

  // 🔹 FINANCE LEAD
  if (role === "finance_lead") {
    return [
      { label: "Dashboard", to: "/finance-dashboard" },
      { label: "Profile", to: "/finance/profile" },

      {
        group: "Finance",
        items: [
          { label: "All Expenses", to: "/finance/expenses" },
          { label: "Approve Payments", to: "/finance/approvals" },
        ],
      },

      {
        group: "Reports",
        items: [
          { label: "Financial Reports", to: "/finance/reports" },
        ],
      },

      ...common,
    ];
  }

  // 🔹 STUDENT MEMBER
  if (role === "member") {
    return [
      { label: "Dashboard", to: "/member-dashboard" },
      { label: "Profile", to: "/member/profile" },

      {
        group: "Expenses",
        items: [
          { label: "Submit Expense", to: "/member/add-expense" },
          { label: "My Expenses", to: "/member/expenses" },
        ],
      },

      ...common,
    ];
  }

  // 🔹 STATIONARY ADMIN
  if (role === "stationary_admin") {
    return [
      { label: "Dashboard", to: "/stationary-dashboard" },
      { label: "Profile", to: "/stationary/profile" },

      {
        group: "Stationary",
        items: [
          { label: "Add Request", to: "/stationary/add-request" },
          { label: "Manage Inventory", to: "/stationary/inventory" },
        ],
      },

      {
        group: "Reports",
        items: [
          { label: "Usage Reports", to: "/stationary/reports" },
        ],
      },

      ...common,
    ];
  }

  // 🔹 Default (not logged in)
  return common;
};