import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";   // 🔥 useState add

// ===== USER PAGES =====
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Notices from "./pages/Notices";
import Events from "./pages/Events";
import Mess from "./pages/Mess";
import Bus from "./pages/Bus";
import LabAvailability from "./pages/LabAvailability";
import LabDetails from "./pages/LabDetails";
import AcademicCalender from "./pages/AcademicCalender";
import Emergency from "./pages/Emergency";

// ===== ADMIN PAGES =====
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminCreateAccount from "./pages/AdminCreateAccount";
/*import AdminEvents from "./pages/AdminEvents";
import AdminNotices from "./pages/AdminNotices";
import AdminMess from "./pages/AdminMess";
import AdminBus from "./pages/AdminBus";
import AdminLab from "./pages/AdminLab";
import AdminCalendar from "./pages/AdminCalendar";
import AdminHelp from "./pages/AdminHelp";*/

// ===== ADMIN LAYOUT =====
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";

import "./App.css";

function ThemeHandler() {
  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";  // 🔥 fix key
    if (saved) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);
  return null;
}

/* 🔥 ADMIN LAYOUT WRAPPER (FINAL FIXED) */
function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-wrapper">

      {/* NAVBAR */}
      <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="app-layout">

        {/* SIDEBAR */}
        <AdminSidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* CONTENT */}
        <div className="main-content">
          {children}
        </div>

      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeHandler />

      <Routes>

        {/* ===== FIRST PAGE ===== */}
        <Route path="/" element={<RoleSelect />} />

        {/* ===== USER ROUTES ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/mess" element={<Mess />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/lab" element={<LabAvailability />} />
        <Route path="/lab-details" element={<LabDetails />} />
        <Route path="/academic" element={<AcademicCalender />} />
        <Route path="/emergency" element={<Emergency />} />

        {/* ===== ADMIN AUTH ===== */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-forgot" element={<AdminForgotPassword />} />
        <Route path="/admin-create" element={<AdminCreateAccount />} />

        {/* ===== ADMIN PAGES WITH LAYOUT ===== */}
        <Route path="/admin-dashboard" element={
          <AdminLayout><AdminDashboard /></AdminLayout>
        } />

       

      </Routes> 
    </BrowserRouter>
  );
}

export default App;