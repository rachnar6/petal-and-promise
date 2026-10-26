import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BlossomBackground from './components/BlossomBackground';
import ConsultationModal from './components/ConsultationModal';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import CustomerPortal from './pages/CustomerPortal';
import NewEventBooking from './pages/NewEventBooking';
import AdminPortal from './pages/AdminPortal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const location = useLocation();

  const isPortalOrAdmin = location.pathname.startsWith('/portal') || location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen relative font-sans bg-ivory-100">
      {/* Warm Floral Petal Rain – sitewide background animation */}
      <BlossomBackground />

      {/* Main Navigation */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Page Content */}
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/"               element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/portal"         element={<CustomerPortal onOpenConsultation={() => setIsConsultationOpen(true)} />} />
          <Route path="/portal/new-event" element={<NewEventBooking />} />
          <Route path="/admin"          element={<AdminPortal />} />
        </Routes>
      </main>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Footer (public pages only) */}
      {!isPortalOrAdmin && (
        <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
      )}
    </div>
  );
}
