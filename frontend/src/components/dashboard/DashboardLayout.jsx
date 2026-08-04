import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import authService from "../../services/authService";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          <main className="p-6 md:p-8 lg:p-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}