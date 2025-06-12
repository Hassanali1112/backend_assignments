import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import DashboardLayout from "../pages/student/DashboardLayout";
import DashboardHome from "../pages/student/DashboardHome";
import Profile from "../pages/student/Profile";
import ApplyCourse from "../pages/student/ApplyCourse";
import ApplicationStatus from "../pages/student/ApplicationStatus";
import DownloadCard from "../pages/student/DownloadCard";
import Layout from "../pages/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="apply-course" element={<ApplyCourse />} />
        <Route path="application-status" element={<ApplicationStatus />} />
        <Route path="download-card" element={<DownloadCard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
