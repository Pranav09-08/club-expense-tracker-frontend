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
import CoordinatorDashboard from "@/pages/coordinator/Dashboard";
import CreateLeadPage from "@/pages/coordinator/CreateLeadPage";
import ManageLeadsPage from "@/pages/coordinator/ManageLeadsPage";
import ClubLeadDashboard from "@/pages/clubLead/Dashboard";
import FinanceDashboard from "@/pages/financeLead/Dashboard";
import MemberDashboard from "@/pages/member/Dashboard";
import StationaryDashboard from "@/pages/stationary/Dashboard";

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

        {/* COORDINATOR */}
        <Route path="/coordinator-dashboard" element={<ProtectedRoute roles={["coordinator"]}><CoordinatorDashboard /></ProtectedRoute>} />
        <Route path="/coordinator/profile" element={<ProtectedRoute roles={["coordinator"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/coordinator/leads/add" element={<ProtectedRoute roles={["coordinator"]}><CreateLeadPage /></ProtectedRoute>} />
        <Route path="/coordinator/leads" element={<ProtectedRoute roles={["coordinator"]}><ManageLeadsPage /></ProtectedRoute>} />

        {/* CLUB LEAD */}
        <Route path="/club-lead-dashboard" element={<ProtectedRoute roles={["club_lead"]}><ClubLeadDashboard /></ProtectedRoute>} />
        <Route path="/club-lead/profile" element={<ProtectedRoute roles={["club_lead"]}><ProfilePage /></ProtectedRoute>} />

        {/* FINANCE LEAD */}
        <Route path="/finance-dashboard" element={<ProtectedRoute roles={["finance_lead"]}><FinanceDashboard /></ProtectedRoute>} />
        <Route path="/finance/profile" element={<ProtectedRoute roles={["finance_lead"]}><ProfilePage /></ProtectedRoute>} />

        {/* MEMBER */}
        <Route path="/member-dashboard" element={<ProtectedRoute roles={["member"]}><MemberDashboard /></ProtectedRoute>} />
        <Route path="/member/profile" element={<ProtectedRoute roles={["member"]}><ProfilePage /></ProtectedRoute>} />

        {/* STATIONARY ADMIN */}
        <Route path="/stationary-dashboard" element={<ProtectedRoute roles={["stationary_admin"]}><StationaryDashboard /></ProtectedRoute>} />
        <Route path="/stationary/profile" element={<ProtectedRoute roles={["stationary_admin"]}><ProfilePage /></ProtectedRoute>} />

        {/* COMMON */}
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutPage />} />

      </Route>

    </Routes>
  );
}