import { Doctor, ServiceItem } from '../types';

export const DOCTORS: Doctor[] = [
  { 
    id: 'd1',
    name: 'Dr. Sarah Mitchell', 
    specialty: 'Chief Medical Officer', 
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
    bio: 'Dr. Mitchell leads our medical team with over 15 years of experience in internal medicine and healthcare administration.'
  },
  { 
    id: 'd2',
    name: 'Dr. James Wilson', 
    specialty: 'Cardiology', 
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
    bio: 'Specializing in preventive cardiology and heart failure management, Dr. Wilson is committed to heart health education.'
  },
  { 
    id: 'd3',
    name: 'Dr. Emily Chen', 
    specialty: 'Pediatrics', 
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80',
    bio: 'Dr. Chen provides compassionate care for children of all ages, creating a comfortable environment for our youngest patients.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: "Primary Care",
    description: "Comprehensive health management for individuals and families, focusing on prevention and wellness.",
    iconName: 'Stethoscope'
  },
  {
    id: 's2',
    title: "Cardiology",
    description: "Advanced heart care including stress testing, echocardiograms, and hypertension management.",
    iconName: 'Heart'
  },
  {
    id: 's3',
    title: "Pediatrics",
    description: "Specialized care for infants, children, and adolescents in a friendly, comfortable environment.",
    iconName: 'Baby'
  },
  {
    id: 's4',
    title: "Neurology",
    description: "Diagnosis and treatment of disorders of the nervous system, including headaches and migraines.",
    iconName: 'Brain'
  },
  {
    id: 's5',
    title: "Ophthalmology",
    description: "Complete eye care services from routine exams to surgical treatments for vision conditions.",
    iconName: 'Eye'
  },
  {
    id: 's6',
    title: "Urgent Care",
    description: "Walk-in services for non-life-threatening illnesses and injuries requiring immediate attention.",
    iconName: 'Activity'
  }
];