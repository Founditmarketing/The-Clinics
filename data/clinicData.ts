import { Doctor, ServiceItem } from '../types';

/* ------------------------------------------------------------------
   Doctors — real Cenla / Alexandria, LA team
   Extended with Harmony-style fields for the provider modal
   ------------------------------------------------------------------ */

const COMMON_HOURS = ['Mon–Thu: 7:45am – 5:00pm', 'Friday: 7:45am – 12:00pm'];
const COMMON_LOCATION = 'Alexandria & Pineville · Cenla';
const COMMON_PHONE = '(318) 445-9823';

/** Total provider headcount across the practice (MDs + NPs across both locations). */
export const PROVIDER_COUNT = 18;

export const DOCTORS: Doctor[] = [
  {
    id: 'michael-buck',
    name: 'Dr. Michael G. Buck, MD',
    role: 'Family Medicine',
    specialty: 'Internal & preventative medicine',
    image: '/Dr. Michael G. Buck.jpg',
    bio: "Dr. Buck builds the medical support system around the patient — listening first, identifying needs, and coordinating high-quality family medicine care across both clinics. Known for taking the time to explain test results in plain English.",
    location: COMMON_LOCATION,
    phone: COMMON_PHONE,
    officeHours: COMMON_HOURS,
    education: ['Doctor of Medicine', 'Family Medicine Residency', 'Board Certified · Family Medicine'],
    languages: ['English'],
    lives: 'Alexandria, LA',
    accepting: true,
    featured: true,
    tags: ['primary'],
  },
  {
    id: 'william-mcbride',
    name: 'Dr. William M. McBride, MD',
    role: 'Family Medicine',
    specialty: 'Diversity-centered family practice',
    image: '/Dr. William M. MCBride.jpg',
    bio: "Dr. McBride values the uniqueness and diversity of every individual in the Cenla community. His practice spans annual physicals, chronic-condition management, and same-day visits for established patients.",
    location: COMMON_LOCATION,
    phone: COMMON_PHONE,
    officeHours: COMMON_HOURS,
    education: ['Doctor of Medicine', 'Family Medicine Residency', 'Board Certified · Family Medicine'],
    languages: ['English'],
    lives: 'Alexandria, LA',
    accepting: true,
    tags: ['primary'],
  },
  {
    id: 'michael-screpetis',
    name: 'Dr. Michael Screpetis, MD',
    role: 'Family Medicine',
    specialty: 'Patient-centered health management',
    image: '',
    bio: "Dr. Screpetis provides comprehensive family medicine with a focus on shared decision-making — building treatment plans around your lifestyle, family, and goals.",
    location: COMMON_LOCATION,
    phone: COMMON_PHONE,
    officeHours: COMMON_HOURS,
    education: ['Doctor of Medicine', 'Family Medicine Residency'],
    languages: ['English'],
    lives: 'Alexandria, LA',
    accepting: true,
    tags: ['primary'],
  },
  {
    id: 'jonathan-hunter',
    name: 'Dr. Jonathan Hunter, MD',
    role: 'Family Medicine',
    specialty: 'Wellness & community health',
    image: '',
    bio: "Dr. Hunter is dedicated to high-quality family medicine and promoting wellness within the Cenla community. Comfortable with everything from new-patient onboarding to long-running chronic disease management.",
    location: COMMON_LOCATION,
    phone: COMMON_PHONE,
    officeHours: COMMON_HOURS,
    education: ['Doctor of Medicine', 'Family Medicine Residency'],
    languages: ['English'],
    lives: 'Alexandria, LA',
    accepting: true,
    tags: ['primary'],
  },
  {
    id: 'michelle-beurlot',
    name: 'Dr. Beurlot, MD',
    role: 'Family Medicine',
    specialty: "Compassionate, accessible care",
    image: '/Dr. Beurlot .png',
    bio: "Dr. Beurlot is committed to improving the health and well-being of patients through compassionate family medicine. Particularly experienced with women's health and pediatric primary care.",
    location: COMMON_LOCATION,
    phone: COMMON_PHONE,
    officeHours: COMMON_HOURS,
    education: ['Doctor of Medicine', 'Family Medicine Residency'],
    languages: ['English'],
    lives: 'Alexandria, LA',
    accepting: true,
    tags: ['primary', 'pediatrics', 'womens'],
  },
  {
    id: 'dana-homer',
    name: 'Dana Homer, NP',
    role: 'Family Medicine NP',
    specialty: 'Family practice across all ages',
    image: '',
    bio: "An experienced nurse practitioner providing a wide range of family medicine services for patients of all ages. Skilled in same-day visits, screenings, and care plan follow-up.",
    location: COMMON_LOCATION,
    phone: COMMON_PHONE,
    officeHours: COMMON_HOURS,
    education: ['Master of Science in Nursing', 'FNP-BC Certified'],
    languages: ['English'],
    lives: 'Alexandria, LA',
    accepting: true,
    tags: ['primary', 'urgent'],
  },
  {
    id: 'frances-turregano',
    name: 'Frances Turregano, NP',
    role: 'Family Medicine NP',
    specialty: 'Prevention & patient education',
    image: '',
    bio: "Focused on health promotion, disease prevention, and patient education for adults, teens, and children. Loves helping families build durable wellness habits between visits.",
    location: COMMON_LOCATION,
    phone: COMMON_PHONE,
    officeHours: COMMON_HOURS,
    education: ['Master of Science in Nursing', 'FNP-BC Certified'],
    languages: ['English'],
    lives: 'Alexandria, LA',
    accepting: true,
    tags: ['primary', 'pediatrics', 'urgent'],
  },
];

/* ------------------------------------------------------------------
   Services — family practice first, plus the rest of what we offer
   ------------------------------------------------------------------ */

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Family Practice',
    tagline: 'About 90% of what we do',
    description:
      'Family medicine is the heart of theCLINICS. Annual physicals, chronic-condition management, pediatric and adult primary care, women\u2019s health, preventative screenings, refills, and same-day sick visits for established patients — coordinated by a provider who knows you over time.',
    expect: '30–45 min · Insurance billed · Same-day prescriptions',
    iconName: 'Stethoscope',
    feature: true,
  },
  {
    id: 's4',
    title: 'Access2Day Health',
    tagline: 'Same-day access',
    description:
      'Convenient access to healthcare services so you get the care you need, when you need it. No appointment required for established patients.',
    expect: 'Walk-in welcome · Mon–Fri',
    iconName: 'Clock',
  },
  {
    id: 's2',
    title: 'Gastroenterology (AGA)',
    tagline: 'Digestive health',
    description:
      'Specialized care for stomach and intestinal health — structure, function, and disease management for everything from acid reflux to colorectal screenings.',
    expect: 'Initial consult 45–60 min · On-site diagnostics',
    iconName: 'Activity',
  },
  {
    id: 's3',
    title: 'Podiatry',
    tagline: 'Foot & ankle specialists',
    description:
      'Diagnosis and surgical treatment of disorders of the foot, ankle, and lower extremity for all ages — from routine care to complex reconstruction.',
    expect: '30–45 min initial visit · Surgical follow-up',
    iconName: 'Activity',
  },
  {
    id: 's5',
    title: 'Bone Density',
    tagline: 'Osteoporosis screening',
    description:
      'Advanced imaging to measure bone strength and assess risk for osteoporosis and fractures — quick, painless, and covered by most plans after age 50.',
    expect: '15 min scan · Results in 24h',
    iconName: 'Bone',
  },
  {
    id: 's9',
    title: 'Pulmonary Function',
    tagline: 'Lung health',
    description:
      'Comprehensive testing to measure lung volume, capacity, and flow rates — essential for asthma, COPD, and pre-surgical evaluation.',
    expect: '20–30 min · No prep required',
    iconName: 'Wind',
  },
  {
    id: 's10',
    title: 'Lab Work',
    tagline: 'On-site diagnostics',
    description:
      'On-site diagnostic laboratory services for blood work and specimen testing — most results back same day, no second trip needed.',
    expect: '< 15 min draw · Same-day results',
    iconName: 'Lab',
  },
  {
    id: 's12',
    title: 'X-ray Services',
    tagline: 'Digital radiography',
    description:
      'Digital radiography for immediate diagnostic imaging of bones and internal structures — read on-site by your provider during your visit.',
    expect: '5–10 min · Read in-visit',
    iconName: 'Scan',
  },
];

/* ------------------------------------------------------------------
   Locations — Alexandria + Pineville
   ------------------------------------------------------------------ */

export interface ClinicLocation {
  key: string;
  name: string;
  city: string;
  state: string;
  region: string;
  flagship?: boolean;
  address: string;
  phone: string;
  tel: string;
  email: string;
  coords: { lat: number; lng: number };
  hoursLabel: string;
  hours: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', { open: number; close: number } | null>;
  services: string[];
  mapsUrl: string;
}

const STANDARD_HOURS = {
  mon: { open: 7.75, close: 17 },
  tue: { open: 7.75, close: 17 },
  wed: { open: 7.75, close: 17 },
  thu: { open: 7.75, close: 17 },
  fri: { open: 7.75, close: 12 },
  sat: null,
  sun: null,
} as Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', { open: number; close: number } | null>;

const FAMILY_PRACTICE_SERVICES = [
  'Family Practice',
  'Same-day visits',
  'Gastroenterology',
  'Podiatry',
  'Lab & Imaging',
];

export const LOCATIONS: ClinicLocation[] = [
  {
    key: 'alexandria',
    name: 'theCLINICS · Alexandria',
    city: 'Alexandria',
    state: 'LA',
    region: 'Central Louisiana',
    flagship: true,
    address: '1587 N Bolton Ave, Alexandria, LA 71303',
    phone: '(318) 445-9823',
    tel: '3184459823',
    email: 'info@theclinics.us',
    coords: { lat: 31.3146, lng: -92.4693 },
    hoursLabel: 'Mon–Thu · 7:45a–5p · Friday · 7:45a–12p',
    hours: STANDARD_HOURS,
    services: FAMILY_PRACTICE_SERVICES,
    mapsUrl:
      'https://www.google.com/maps/place/The+Clinics/@31.314633,-92.4693039,17z/data=!3m1!4b1!4m6!3m5!1s0x86254b45d31c8a13:0x6670722edf39a203!8m2!3d31.314633!4d-92.4693039!16s%2Fg%2F1tdnfmbj',
  },
  {
    key: 'pineville',
    name: 'theCLINICS · Pineville',
    city: 'Pineville',
    state: 'LA',
    region: 'Central Louisiana',
    address: 'Pineville, LA · call for address',
    phone: '(318) 445-9823',
    tel: '3184459823',
    email: 'info@theclinics.us',
    coords: { lat: 31.3224, lng: -92.4346 },
    hoursLabel: 'Mon–Thu · 7:45a–5p · Friday · 7:45a–12p',
    hours: STANDARD_HOURS,
    services: FAMILY_PRACTICE_SERVICES,
    mapsUrl: 'https://www.google.com/maps/search/the+clinics+pineville+la',
  },
];

/* ------------------------------------------------------------------
   Shared clinic info (back-compat for components that import CLINIC)
   Defaults to the flagship Alexandria location.
   ------------------------------------------------------------------ */

const FLAGSHIP = LOCATIONS.find((l) => l.flagship) || LOCATIONS[0];

export const CLINIC = {
  name: FLAGSHIP.name,
  city: FLAGSHIP.city,
  state: FLAGSHIP.state,
  region: FLAGSHIP.region,
  flagship: FLAGSHIP.flagship,
  address: FLAGSHIP.address,
  phone: FLAGSHIP.phone,
  tel: FLAGSHIP.tel,
  email: FLAGSHIP.email,
  coords: FLAGSHIP.coords,
  hoursLabel: FLAGSHIP.hoursLabel,
  hours: FLAGSHIP.hours,
  services: FLAGSHIP.services,
  patientPortalUrl: 'https://mycw11.eclinicalweb.com/portal351/jsp/100mp/login_otp.jsp',
  facebookUrl: 'https://www.facebook.com/cenlafamilymedicineassociates',
  mapsUrl: FLAGSHIP.mapsUrl,
  googleReviewsUrl: 'https://www.google.com/search?q=The+Clinics+Alexandria+LA+reviews',
  rating: 4.8,
  foundedYear: 1998,
} as const;

/* ------------------------------------------------------------------
   Insurance carriers — ticker (string list) + InsuranceChecker (typed)
   ------------------------------------------------------------------ */

export interface InsurancePlan {
  name: string;
  /** true = in-network, null = "we can verify", false = not currently. */
  accepted: true | false | null;
  note?: string;
}

export const INSURANCE_PLANS: InsurancePlan[] = [
  { name: 'Blue Cross Blue Shield Louisiana', accepted: true },
  { name: 'Aetna', accepted: true },
  { name: 'UnitedHealthcare', accepted: true },
  { name: 'Cigna', accepted: true },
  { name: 'Humana', accepted: true },
  { name: 'Medicare', accepted: true },
  { name: 'Medicaid (Louisiana)', accepted: true },
  { name: 'TRICARE', accepted: true },
  { name: 'Vantage Health Plan', accepted: true },
  { name: 'Peoples Health (Medicare Advantage)', accepted: true },
  { name: 'Ambetter', accepted: true },
  { name: 'Healthy Blue Louisiana', accepted: true },
  {
    name: 'Self-pay (cash)',
    accepted: true,
    note: 'Transparent self-pay pricing available — call for an estimate.',
  },
  {
    name: 'Other plan',
    accepted: null,
    note: 'Call (318) 445-9823 and we will verify your plan in minutes.',
  },
];

/** Legacy export kept for the home-page ticker. */
export const INSURANCE_CARRIERS = INSURANCE_PLANS.filter(
  (p) => p.accepted === true && !p.name.startsWith('Self-pay'),
).map((p) => p.name);

/* ------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------ */

export const FAQS = [
  {
    q: 'Do I need an appointment to be seen?',
    a: 'For new patients we ask you to schedule ahead so we can review records and pull together the right team. Established patients can use Access2Day for same-day visits — call us or walk in to either location.',
  },
  {
    q: 'What insurance do you accept?',
    a: "We're in-network with Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, Humana, Tricare, Medicare, and Medicaid. Don't see yours? Call us — we likely take it.",
  },
  {
    q: 'How fast can a new patient be seen?',
    a: 'Most new-patient family-practice appointments are available within a week. For urgent needs, established patients can use Access2Day Mon–Fri.',
  },
  {
    q: 'Do you treat children?',
    a: 'Yes. Several providers — including Dr. Beurlot and NP Frances Turregano — see pediatric patients for well-child visits, sick visits, and school physicals.',
  },
  {
    q: 'How do I request a visit?',
    a: 'Use the patient portal — it has a proven visit-request feature where your message goes straight to the right team. You can also call us at (318) 445-9823 during business hours.',
  },
  {
    q: 'Where are your locations?',
    a: 'We have two clinics in Cenla — our flagship in Alexandria on N Bolton Ave, and a second location in Pineville. Call us if you are unsure which one is closer to you.',
  },
  {
    q: 'Is there a patient portal?',
    a: 'Yes — through eClinicalWorks you can message your provider, view records, see lab results, request refills, and request visits.',
  },
];

/* ------------------------------------------------------------------
   Testimonials
   ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    q: "First visit and overall it was a great experience. The staff was so friendly and extremely knowledgeable. I felt very comfortable and am so thankful my friend referred me.",
    n: 'Kasey M.',
    l: 'Alexandria, LA',
    visit: 'Family practice',
    featured: true,
  },
  { q: 'The team are experienced and caring individuals.', n: 'Grace W.', l: 'Pineville, LA', visit: 'Annual physical' },
  {
    q: "I had an amazing experience taking my son. He has always been afraid of the doctor's office, but the team was so patient.",
    n: 'Ryan P.',
    l: 'Alexandria, LA',
    visit: 'Pediatric visit',
  },
  {
    q: 'Dr. Buck takes time. He listens. He answers. I haven\'t felt this seen by a doctor in years.',
    n: 'Rebecca H.',
    l: 'Alexandria, LA',
    visit: 'Family practice',
  },
  {
    q: 'Same-day appointment, in and out before lunch, and they actually called back the next day to check on me.',
    n: 'James T.',
    l: 'Ball, LA',
    visit: 'Same-day visit',
  },
];

/* ------------------------------------------------------------------
   Affiliations
   ------------------------------------------------------------------ */

export const AFFILIATIONS = [
  { name: 'LSU Health', sub: 'Shreveport / Alexandria' },
  { name: 'Rapides Regional', sub: 'Medical Center' },
  { name: 'Christus St. Frances', sub: 'Cabrini' },
  { name: 'Cenla Family Medicine', sub: 'Associates' },
  { name: 'eClinicalWorks', sub: 'Patient portal' },
  { name: 'Access2Day', sub: 'Same-day care' },
];

/* ------------------------------------------------------------------
   Filter tabs for the care team grid
   ------------------------------------------------------------------ */

export const PROVIDER_FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'primary', label: 'Family practice' },
  { id: 'pediatrics', label: 'Pediatrics' },
  { id: 'womens', label: 'Women\u2019s health' },
  { id: 'urgent', label: 'Same-day' },
];
