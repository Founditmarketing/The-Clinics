export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Stethoscope' | 'Heart' | 'Activity' | 'Baby' | 'Brain' | 'Eye';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
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
  DASHBOARD = '/dashboard'
}