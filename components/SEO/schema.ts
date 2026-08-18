import { CLINIC, LOCATIONS, ClinicLocation } from '../../data/clinicData';
import { ServiceItem } from '../../types';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from './siteConfig';

/** Converts the decimal-hour format used in clinicData (e.g. 7.75, 17) to "HH:MM". */
const decimalToTime = (value: number): string => {
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const DAY_NAMES: Record<keyof ClinicLocation['hours'], string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

const openingHoursSpecification = (location: ClinicLocation) =>
  (Object.keys(location.hours) as Array<keyof ClinicLocation['hours']>)
    .filter((day) => location.hours[day] !== null)
    .map((day) => {
      const range = location.hours[day]!;
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_NAMES[day],
        opens: decimalToTime(range.open),
        closes: decimalToTime(range.close),
      };
    });

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Sitewide MedicalOrganization — rendered on every page via PageSEO. */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  telephone: `+1${CLINIC.tel}`,
  sameAs: [CLINIC.facebookUrl],
  medicalSpecialty: ['Primary Care', 'Gastroenterology', 'Podiatry'],
});

/** LocalBusiness (MedicalBusiness) schema for one physical location. */
export const getLocationSchema = (location: ClinicLocation) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: location.name,
  parentOrganization: { '@id': ORGANIZATION_ID },
  image: DEFAULT_OG_IMAGE,
  url: `${SITE_URL}/contact`,
  telephone: `+1${location.tel}`,
  email: location.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: location.streetAddress,
    addressLocality: location.city,
    addressRegion: location.state,
    postalCode: location.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: location.coords.lat,
    longitude: location.coords.lng,
  },
  hasMap: location.mapsUrl,
  openingHoursSpecification: openingHoursSpecification(location),
});

export const getAllLocationSchemas = () => LOCATIONS.map(getLocationSchema);

/** Service schema for a single service-detail page. */
export const getServiceSchema = (service: ServiceItem) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.description,
  serviceType: service.title,
  provider: { '@id': ORGANIZATION_ID },
  areaServed: {
    '@type': 'City',
    name: 'Alexandria',
    containedInPlace: { '@type': 'State', name: 'Louisiana' },
  },
  url: `${SITE_URL}/service/${service.id}`,
});

/** FAQPage schema for the Patient Resources FAQ accordion. */
export const getFAQPageSchema = (faqs: Array<{ q: string; a: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
});
