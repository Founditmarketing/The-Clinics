export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Stethoscope' | 'Heart' | 'Activity' | 'Baby' | 'Brain' | 'Eye' | 'Clock' | 'Bone' | 'Lab' | 'Wind' | 'Zap' | 'Scan' | 'Monitor' | 'Syringe';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
  phone?: string;
  location?: string;
  officeHours?: string[];
  patientPortalUrl?: string; // Optional override if specific doctors have different portals
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export enum PageRoute {
  HOME = '/',
  SERVICES = '/services',
  ABOUT = '/about',
  CONTACT = '/contact',
  DASHBOARD = '/dashboard',
  DOCTOR_PROFILE = '/doctor/:id',
  SERVICE_DETAIL = '/service/:id',
  PATIENT_RESOURCES = '/patient-resources'
}