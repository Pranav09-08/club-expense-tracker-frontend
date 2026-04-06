import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";

/* Dashboards */
import AdminDashboard from "@/pages/admin/Dashboard";
import CreateClubPage from "@/pages/admin/CreateClubPage";
import CreateCoordinatorPage from "@/pages/admin/CreateCoordinatorPage";
import ManageClubsPage from "@/pages/admin/ManageClubsPage";
import ManageCoordinatorsPage from "@/pages/admin/ManageCoordinatorsPage";
import ExpenseOverviewPage from "@/pages/admin/ExpenseOverviewPage";
import BudgetAnalysisPage from "@/pages/admin/BudgetAnalysisPage";
import CoordinatorDashboard from "@/pages/coordinator/Dashboard";
import CreateLeadPage from "@/pages/coordinator/CreateLeadPage";
import ManageLeadsPage from "@/pages/coordinator/ManageLeadsPage";
import ClubLeadDashboard from "@/pages/clubLead/Dashboard";
import AddExpensePage from "@/pages/clubLead/AddExpensePage";
import SeeExpensesPage from "@/pages/clubLead/SeeExpensesPage";
import CreateMemberPage from "@/pages/clubLead/CreateMemberPage";
import ManageMembersPage from "@/pages/clubLead/ManageMembersPage";
import FinanceDashboard from "@/pages/financeLead/Dashboard";
import AllExpensesPage from "@/pages/financeLead/AllExpensesPage";
import ApprovalsPage from "@/pages/financeLead/ApprovalsPage";
import FinanceReportsPage from "@/pages/financeLead/ReportsPage";
import MemberDashboard from "@/pages/member/Dashboard";
import SubmitExpensePage from "@/pages/member/SubmitExpensePage";
import MyExpensesPage from "@/pages/member/MyExpensesPage";
import StationaryDashboard from "@/pages/stationary/Dashboard";
import StationaryRequestsPage from "@/pages/stationary/RequestsPage";
import StationaryInventoryPage from "@/pages/stationary/InventoryPage";
import StationaryReportsPage from "@/pages/stationary/ReportsPage";

/* Common Pages */
import ProfilePage from "@/pages/ProfilePage";
import HelpPage from "@/pages/HelpPage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🔹 Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 🔹 Layout Wrapper */}
      <Route
        element={(
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        )}
      >

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute roles={["admin"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/admin/clubs/add" element={<ProtectedRoute roles={["admin"]}><CreateClubPage /></ProtectedRoute>} />
        <Route path="/admin/clubs" element={<ProtectedRoute roles={["admin"]}><ManageClubsPage /></ProtectedRoute>} />
        <Route path="/admin/coordinators/add" element={<ProtectedRoute roles={["admin"]}><CreateCoordinatorPage /></ProtectedRoute>} />
        <Route path="/admin/coordinators" element={<ProtectedRoute roles={["admin"]}><ManageCoordinatorsPage /></ProtectedRoute>} />
        <Route path="/admin/users/add" element={<ProtectedRoute roles={["admin"]}><CreateCoordinatorPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><ManageCoordinatorsPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute roles={["admin"]}><ExpenseOverviewPage /></ProtectedRoute>} />
        <Route path="/admin/analysis" element={<ProtectedRoute roles={["admin"]}><BudgetAnalysisPage /></ProtectedRoute>} />

        {/* COORDINATOR */}
        <Route path="/coordinator-dashboard" element={<ProtectedRoute roles={["coordinator"]}><CoordinatorDashboard /></ProtectedRoute>} />
        <Route path="/coordinator/profile" element={<ProtectedRoute roles={["coordinator"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/coordinator/leads/add" element={<ProtectedRoute roles={["coordinator"]}><CreateLeadPage /></ProtectedRoute>} />
        <Route path="/coordinator/leads" element={<ProtectedRoute roles={["coordinator"]}><ManageLeadsPage /></ProtectedRoute>} />

        {/* CLUB LEAD */}
        <Route path="/club-lead-dashboard" element={<ProtectedRoute roles={["club_lead"]}><ClubLeadDashboard /></ProtectedRoute>} />
        <Route path="/club-lead/profile" element={<ProtectedRoute roles={["club_lead"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/club-lead/add-expense" element={<ProtectedRoute roles={["club_lead"]}><AddExpensePage /></ProtectedRoute>} />
        <Route path="/club-lead/expenses" element={<ProtectedRoute roles={["club_lead"]}><SeeExpensesPage /></ProtectedRoute>} />
        <Route path="/club-lead/members/add" element={<ProtectedRoute roles={["club_lead"]}><CreateMemberPage /></ProtectedRoute>} />
        <Route path="/club-lead/members" element={<ProtectedRoute roles={["club_lead"]}><ManageMembersPage /></ProtectedRoute>} />
        <Route path="/club-lead/pending" element={<ProtectedRoute roles={["club_lead"]}><ManageMembersPage /></ProtectedRoute>} />

        {/* FINANCE LEAD */}
        <Route path="/finance-dashboard" element={<ProtectedRoute roles={["finance_lead"]}><FinanceDashboard /></ProtectedRoute>} />
        <Route path="/finance/profile" element={<ProtectedRoute roles={["finance_lead"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/finance/expenses" element={<ProtectedRoute roles={["finance_lead"]}><AllExpensesPage /></ProtectedRoute>} />
        <Route path="/finance/approvals" element={<ProtectedRoute roles={["finance_lead"]}><ApprovalsPage /></ProtectedRoute>} />
        <Route path="/finance/reports" element={<ProtectedRoute roles={["finance_lead"]}><FinanceReportsPage /></ProtectedRoute>} />

        {/* MEMBER */}
        <Route path="/member-dashboard" element={<ProtectedRoute roles={["member"]}><MemberDashboard /></ProtectedRoute>} />
        <Route path="/member/profile" element={<ProtectedRoute roles={["member"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/member/add-expense" element={<ProtectedRoute roles={["member"]}><SubmitExpensePage /></ProtectedRoute>} />
        <Route path="/member/expenses" element={<ProtectedRoute roles={["member"]}><MyExpensesPage /></ProtectedRoute>} />

        {/* STATIONARY ADMIN */}
        <Route path="/stationary-dashboard" element={<ProtectedRoute roles={["stationary_admin"]}><StationaryDashboard /></ProtectedRoute>} />
        <Route path="/stationary/profile" element={<ProtectedRoute roles={["stationary_admin"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/stationary/add-request" element={<ProtectedRoute roles={["stationary_admin"]}><StationaryRequestsPage /></ProtectedRoute>} />
        <Route path="/stationary/inventory" element={<ProtectedRoute roles={["stationary_admin"]}><StationaryInventoryPage /></ProtectedRoute>} />
        <Route path="/stationary/reports" element={<ProtectedRoute roles={["stationary_admin"]}><StationaryReportsPage /></ProtectedRoute>} />

        {/* COMMON */}
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutPage />} />

      </Route>

    </Routes>
  );
}