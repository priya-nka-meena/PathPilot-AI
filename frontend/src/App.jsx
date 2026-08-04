import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import DashboardRoute from "./pages/DashboardRoute";
import ComingSoon from "./pages/ComingSoon";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>} />
        <Route path="/profile-setup" element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>} />

        {/* Dashboard and sub-pages */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardRoute /></ProtectedRoute>} />
        <Route path="/dashboard/ai" element={<ComingSoon title="AI Career Advisor - Coming Soon" />} />
        <Route path="/dashboard/jobs" element={<ComingSoon title="Live Jobs - Coming Soon" />} />
        <Route path="/dashboard/recommendations" element={<ComingSoon title="Recommendations - Coming Soon" />} />
        <Route path="/dashboard/resume" element={<ComingSoon title="Resume Analysis - Coming Soon" />} />
        <Route path="/dashboard/skill-gap" element={<ComingSoon title="Skill Gap Analysis - Coming Soon" />} />
        <Route path="/dashboard/roadmap" element={<ComingSoon title="Learning Roadmap - Coming Soon" />} />
        <Route path="/dashboard/settings" element={<ComingSoon title="Settings - Coming Soon" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
