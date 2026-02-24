import { Doctor, ServiceItem } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: 'michael-buck',
    name: 'Dr. Michael G. Buck',
    specialty: 'Primary Care',
    image: '/Dr. Michael G. Buck.jpg',
    bio: 'Focused on being the best Medical Support System for each individual patient, identifying needs and providing high-quality service.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'william-mcbride',
    name: 'Dr. William M. McBride',
    specialty: 'Primary Care',
    image: '/Dr. William M. MCBride.jpg',
    bio: 'Dedicated to valuing and respecting the uniqueness and diversity of all individuals in the community.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'michael-screpetis',
    name: 'Dr. Michael Screpetis',
    specialty: 'Primary Care',
    image: '',
    bio: 'Providing comprehensive primary care services with a focus on patient-centered health management.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'jonathan-hunter',
    name: 'Dr. Jonathan Hunter',
    specialty: 'Primary Care',
    image: '',
    bio: 'Dedicated to providing high-quality medical care and promoting wellness within the community.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'michelle-beurlot',
    name: 'Dr. Beurlot',
    specialty: 'Primary Care',
    image: '/Dr. Beurlot .png',
    bio: 'Committed to improving the health and well-being of patients through compassionate and accessible care.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'dana-homer',
    name: 'Dana Homer N.P.',
    specialty: 'Primary Care',
    image: '',
    bio: 'A experienced nurse practitioner providing a wide range of primary care services for patients of all ages.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    officeHours: ['Mon-Thu: 7:45AM – 5:00PM', 'Friday: 7:45AM – 12:00PM']
  },
  {
    id: 'frances-turregano',
    name: 'Frances Turregano N.P.',
    specialty: 'Primary Care',
    image: '',
    bio: 'Providing health promotion, disease prevention, and patient education for adults, teens, and children.',
    location: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
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
  },
  {
    id: 's5',
    title: "Bone Density",
    description: "Advanced imaging to measure bone strength and assess risk for osteoporosis and fractures.",
    iconName: 'Bone'
  },
  {
    id: 's6',
    title: "Holter Monitors",
    description: "Continuous heart rhythm monitoring to detect irregularities over 24-48 hours.",
    iconName: 'Monitor'
  },
  {
    id: 's7',
    title: "Electrocardiogram (EKG)",
    description: "Quick and painless test to record the electrical signals in your heart.",
    iconName: 'Zap'
  },
  {
    id: 's8',
    title: "Stress Test",
    description: "Evaluation of heart function and blood flow during physical exertion.",
    iconName: 'Activity'
  },
  {
    id: 's9',
    title: "Pulmonary Function",
    description: "Comprehensive testing to measure lung volume, capacity, and flow rates.",
    iconName: 'Wind'
  },
  {
    id: 's10',
    title: "Lab Work",
    description: "On-site diagnostic laboratory services for blood work and specimen testing.",
    iconName: 'Lab'
  },
  {
    id: 's11',
    title: "Cardiac Ultrasound",
    description: "Non-invasive imaging to visualize heart structure and function.",
    iconName: 'Heart'
  },
  {
    id: 's12',
    title: "X-ray Services",
    description: "Digital radiography for immediate diagnostic imaging of bones and internal structures.",
    iconName: 'Scan'
  }
];