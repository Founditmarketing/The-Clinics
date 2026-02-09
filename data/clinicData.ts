import { Doctor, ServiceItem } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: 'noah-miller',
    name: 'Dr. Noah Miller',
    specialty: 'Family Medicine',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
    bio: 'Dr. Noah Miller is excited to join Cenla Family Medicine at "theCLINICS". He brings a positive outlook to the doctor\'s office.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'michael-buck',
    name: 'Dr. Michael G. Buck',
    specialty: 'Primary Care',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80',
    bio: 'Focused on being the best Medical Support System for each individual patient, identifying needs and providing high-quality service.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'william-mcbride',
    name: 'Dr. William M. McBride',
    specialty: 'Primary Care',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
    bio: 'Dedicated to valuing and respecting the uniqueness and diversity of all individuals in the community.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'frances-turregano',
    name: 'Frances Turregano N.P.',
    specialty: 'Primary Care',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80',
    bio: 'Providing health promotion, disease prevention, and patient education for adults, teens, and children.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'joseph-hollier',
    name: 'Dr. Joseph Hollier',
    specialty: 'Gastroenterology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
    bio: 'Specializing in the structure, functions, diseases, and pathology of the stomach and intestines.',
    location: '587 North Bolton Avenue Suite 1100, Alexandria, LA 71303',
    phone: '318-473-8188',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'kim-sills',
    name: 'Kim Sills N.P.',
    specialty: 'Gastroenterology',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80',
    bio: 'Working alongside Dr. Hollier to provide comprehensive gastroenterological care.',
    location: '1587 North Bolton Avenue Suite 1100, Alexandria, LA 71303',
    phone: '318-473-8188',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'paul-sunderhaus',
    name: 'Dr. Paul T. Sunderhaus',
    specialty: 'Podiatry',
    image: 'https://images.unsplash.com/photo-1612531386530-97286d74c2ea?auto=format&fit=crop&q=80',
    bio: 'Specializing in the diagnosis and treatment of disorders of the foot, ankle, and lower extremity.',
    location: '1587 North Bolton Avenue Suite 1500, Alexandria, LA 71303',
    phone: '318-445-9210',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'maria-saucier',
    name: 'Dr. Maria N. Saucier',
    specialty: 'Podiatry',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
    bio: 'Providing expert podiatric care for adults and children, focusing on accurate diagnosis and effective treatment.',
    location: '1587 North Bolton Avenue Suite 1500, Alexandria, LA 71303',
    phone: '318-445-9210',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: "Primary Care / Family Medicine",
    description: "Comprehensive health management for individuals and families, focusing on prevention and wellness.",
    iconName: 'Stethoscope'
  },
  {
    id: 's2',
    title: "Gastroenterology (AGA)",
    description: "Specialized care for stomach and intestinal health, including structure, function, and disease management.",
    iconName: 'Activity' // Changed from Heart for variety as specific icon might not be available
  },
  {
    id: 's3',
    title: "Podiatry",
    description: "Diagnosis and surgical treatment of disorders of the foot, ankle, and lower extremity for all ages.",
    iconName: 'Activity' // Using Activity as a generic health icon if Foot isn't available in Lucide (it's not efficiently)
  },
  {
    id: 's4',
    title: "Access2Day Health",
    description: "Convenient access to healthcare services ensuring you get the care you need, when you need it.",
    iconName: 'Clock'
  }
];