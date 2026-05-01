import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Appointment } from '../types';

interface UIContextType {
  // Modal State
  isBookingModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  // Booking Context
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

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

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
      status: 'Completed'
    }
  ]);

  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const addAppointment = (appt: Appointment) => {
    setAppointments(prev => [appt, ...prev]);
  };

  const resetSelections = () => {
    setPreselectedServiceId(null);
    setPreselectedDoctorId(null);
  };

  const openBookingModal = () => {
    resetSelections();
    setIsBookingModalOpen(true);
  };

  const openBookingWithService = (serviceId: string) => {
    resetSelections();
    setPreselectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const openBookingWithDoctor = (doctorId: string) => {
    resetSelections();
    setPreselectedDoctorId(doctorId);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setTimeout(() => resetSelections(), 300);
  };

  return (
    <UIContext.Provider value={{ 
      isBookingModalOpen, 
      openBookingModal, 
      closeBookingModal,
      isLoginModalOpen,
      openLoginModal: () => setIsLoginModalOpen(true),
      closeLoginModal: () => setIsLoginModalOpen(false),
      preselectedServiceId,
      preselectedDoctorId,
      openBookingWithService,
      openBookingWithDoctor,
      user,
      login,
      logout,
      appointments,
      addAppointment
    }}>
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