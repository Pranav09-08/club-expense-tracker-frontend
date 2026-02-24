import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";

/* Dashboards */
import AdminDashboard from "@/pages/admin/Dashboard";
import CoordinatorDashboard from "@/pages/coordinator/Dashboard";
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
      <Route element={<DashboardLayout />}>

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute roles={["admin"]}><ProfilePage /></ProtectedRoute>} />

        {/* COORDINATOR */}
        <Route path="/coordinator-dashboard" element={<ProtectedRoute roles={["coordinator"]}><CoordinatorDashboard /></ProtectedRoute>} />
        <Route path="/coordinator/profile" element={<ProtectedRoute roles={["coordinator"]}><ProfilePage /></ProtectedRoute>} />

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