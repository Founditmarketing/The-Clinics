export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | 'Stethoscope'
    | 'Heart'
    | 'Activity'
    | 'Baby'
    | 'Brain'
    | 'Eye'
    | 'Clock'
    | 'Bone'
    | 'Lab'
    | 'Wind'
    | 'Zap'
    | 'Scan'
    | 'Monitor'
    | 'Syringe';
  /** Editorial subtitle (e.g. "Your medical home") shown in Harmony-style cards. */
  tagline?: string;
  /** What-to-expect copy displayed beneath the service title. */
  expect?: string;
  /** Display this service as the featured tile in the services grid. */
  feature?: boolean;
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
  patientPortalUrl?: string;
  /** Education / training credentials, shown in the provider modal. */
  education?: string[];
  /** Languages the provider speaks. */
  languages?: string[];
  /** Where the provider lives or community ties. */
  lives?: string;
  /** Currently accepting new patients. */
  accepting?: boolean;
  /** Show a "Featured" badge on the provider card. */
  featured?: boolean;
  /** Tags used for filtering (specialty slugs, location slugs). */
  tags?: string[];
  /** Short pull-quote shown on the editorial card. */
  role?: string;
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
  PATIENT_RESOURCES = '/patient-resources',
}

/** Triage classification returned by the AI symptom checker. */
export type TriageService =
  | 'primary'
  | 'urgent'
  | 'gastro'
  | 'podiatry'
  | 'imaging'
  | 'emergency';

export interface TriageRecommendation {
  service: TriageService;
  severity: 'low' | 'moderate' | 'high';
  summary: string;
  action: string;
  urgency_label: string;
}
