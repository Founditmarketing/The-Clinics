import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ChatWidget from './components/AI/ChatWidget';
import BookingModal from './components/Booking/BookingModal';
import LoginModal from './components/Auth/LoginModal';
import { UIProvider } from './context/UIContext';
import { PageRoute } from './types';
import DoctorProfile from './pages/DoctorProfile';
import PatientResources from './pages/PatientResources';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <UIProvider>
      <Router>
        <div className="font-sans text-slate-900 antialiased flex flex-col min-h-screen">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path={PageRoute.HOME} element={<Home />} />
              <Route path={PageRoute.SERVICES} element={<Services />} />
              <Route path={PageRoute.ABOUT} element={<About />} />
              <Route path={PageRoute.CONTACT} element={<Contact />} />
              <Route path={PageRoute.DASHBOARD} element={<Dashboard />} />
              <Route path={PageRoute.DOCTOR_PROFILE} element={<DoctorProfile />} />
              <Route path={PageRoute.PATIENT_RESOURCES} element={<PatientResources />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
          <BookingModal />
          <LoginModal />
        </div>
      </Router>
    </UIProvider>
  );
};

export default App;