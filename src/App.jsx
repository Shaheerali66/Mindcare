import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import ConsultantDashboard from './pages/dashboards/ConsultantDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import './App.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
        <Route path="/pricing" element={<><Navbar /><PricingPage /><Footer /></>} />
        <Route path="/privacy" element={<><Navbar /><PrivacyPage /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboards */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/consultant" element={<ConsultantDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
