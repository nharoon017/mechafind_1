import Navbar from "./components/Navbar";
import Home from "./components/home";
import About from "./components/About";
import Services from "./components/services";
import Partners from "./components/partners";
import SearchMechanic from "./components/SearchMechanic";
import Emergency from "./components/Emergency";
import Login from "./components/Login";
import Register from "./components/Register";
import MechanicRegister from "./components/MechanicRegister";
import MechanicLogin from "./components/MechanicLogin";
import MechanicDashboard from "./components/MechanicDashboard";
import MechanicProfile from "./components/MechanicProfile";
import CustomerDashboard from "./components/CustomerDashboard";

import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMechanicRoute = location.pathname.startsWith('/mechanic');

  useEffect(() => {
    const userRaw = localStorage.getItem('mechafind_user');
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        if (user.role === 'Mechanic' && !isMechanicRoute) {
          navigate('/mechanic/dashboard', { replace: true });
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [location.pathname, isMechanicRoute, navigate]);

  return (
    <>
      {!isMechanicRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/search" element={<SearchMechanic />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mechanic/register" element={<MechanicRegister />} />
        <Route path="/mechanic/login" element={<MechanicLogin />} />
        <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />
        <Route path="/mechanic/profile" element={<MechanicProfile />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;