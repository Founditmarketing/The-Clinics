import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Appointment } from '../types';
import { CLINIC } from '../data/clinicData';

interface UIContextType {
  // Modal State (kept for back-compat; the in-app modal is no longer used —
  // visit requests are routed to the patient portal, which has a proven
  // visit-request flow).
  isBookingModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;

  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  // Booking Context (kept for back-compat; routes to portal).
  preselectedServiceId: string | null;
  preselectedDoctorId: string | null;
  openBookingWithService: (serviceId: string) => void;
  openBookingWithDoctor: (doctorId: string) => void;

  // User Data
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;

  // Appointment Data
  appointments: Appointment[];
  addAppointment: (appt: Appointment) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

/**
 * Open the patient portal's visit-request flow in a new tab.
 * This is the single source of truth for "Book a visit" in the app.
 */
const openPatientPortal = () => {
  if (typeof window === 'undefined') return;
  window.open(CLINIC.patientPortalUrl, '_blank', 'noopener,noreferrer');
};

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Mock User State
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    // One past appointment for demo purposes
    {
      id: 'prev-1',
      doctorName: 'Dr. Sarah Mitchell',
      serviceName: 'Primary Care',
      date: 'Oct 12',
      time: '10:00 AM',
      status: 'Completed',
    },
  ]);

  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const addAppointment = (appt: Appointment) => {
    setAppointments((prev) => [appt, ...prev]);
  };

  // Booking actions all route to the patient portal in a new tab.
  const openBookingModal = () => openPatientPortal();
  const openBookingWithService = (_serviceId: string) => openPatientPortal();
  const openBookingWithDoctor = (_doctorId: string) => openPatientPortal();
  const closeBookingModal = () => {
    /* noop — modal is never shown */
  };

  return (
    <UIContext.Provider
      value={{
        isBookingModalOpen: false,
        openBookingModal,
        closeBookingModal,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        preselectedServiceId: null,
        preselectedDoctorId: null,
        openBookingWithService,
        openBookingWithDoctor,
        user,
        login,
        logout,
        appointments,
        addAppointment,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
