import React, { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   theCLINICS — bilingual strings (Cenla, LA edition of Harmony 2)
   ------------------------------------------------------------------ */

const STRINGS = {
  en: {
    nav: {
      services: 'Services',
      team: 'Team',
      locations: 'Visit',
      faq: 'FAQ',
      portal: 'Patient Portal',
      book: 'Book Visit',
      lang: 'EN',
    },
    hero: {
      eyebrow: 'Now welcoming new patients',
      headline_a: 'A different',
      headline_b: 'kind',
      headline_c: 'of',
      headline_d: 'healthcare,',
      headline_em: 'built for',
      headline_f: 'Cenla.',
      mobile_hl_1: 'Experience the Cenla difference',
      mobile_hl_2_before: 'Fall in love with ',
      mobile_hl_2_em: 'healthcare',
      mobile_hl_2_after: ' again',
      lead:
        'We provide comprehensive care — annual physicals, sick visits, pediatrics, women\u2019s health, chronic-condition care — plus gastro, podiatry, and on-site labs, delivered by clinicians who live in Cenla too.',
      cta_primary: 'Request a visit',
      cta_secondary: 'Explore services',
      cta_tertiary: 'Same-day care',
      proof_title: 'Visit requests go through the portal',
      proof_loc: 'Alexandria & Pineville',
      proof_time: 'Replies within one business hour',
      meta_open: 'Open now',
      meta_closed: 'Closed',
      meta_drive: 'min drive',
      meta_nearest: 'Our clinics',
      stats_locations: 'locations',
      stats_providers: 'providers',
      stats_years: 'years in Cenla',
      stats_pcmh: 'Comprehensive care first',
    },
    intent: {
      eyebrow: 'Where to start',
      title: 'What brings you in today?',
      sick: {
        t: 'I am sick today',
        d: 'Same-day visits for established patients via Access2Day.',
        cta: 'Request a same-day slot',
      },
      primary: {
        t: 'I need a primary care doctor',
        d: 'Match with a primary care provider who takes your insurance and your pace.',
        cta: 'Find my doctor',
      },
      pediatrics: {
        t: 'My child needs a doctor',
        d: 'Well-child checks, school physicals, and sick visits with providers who see kids.',
        cta: 'Request a pediatric visit',
      },
    },
    insurance: {
      eyebrow: 'Insurance',
      title: 'Are we in network for you?',
      sub: 'Type your plan and we will tell you in seconds.',
      placeholder: 'Start typing your insurance plan',
      yes: 'Yes, we accept this plan.',
      maybe: 'We can verify this in minutes, give us a call.',
      noresult: 'Tell us which plan you have, our team will check.',
      callus: 'Call to verify',
    },
    services: {
      eyebrow: 'Services',
      title_a: 'Comprehensive care,',
      title_em: 'plus the rest',
      title_b: '.',
      lead:
        'We offer a wide range of services — annual physicals, pediatrics, women\u2019s health, chronic-condition care. Gastro, podiatry, labs, and X-ray fill in the rest.',
      all: 'View all services',
    },
    urgent: {
      eyebrow: 'Same-day or ER?',
      title_a: 'Right care,',
      title_em: 'right place',
      title_b: '.',
      lead: 'When seconds matter, the right destination matters too. Here is the simple rule we use.',
      uc_title: 'Same-day, our team',
      uc_items: [
        'Established patients via Access2Day',
        'Sprains, minor cuts, lab tests',
        'X-rays read in-visit',
        'Mild infections, allergies, refills',
      ],
      er_title: 'Emergency room, call 911',
      er_items: [
        'Chest pain or trouble breathing',
        'Stroke symptoms, severe weakness',
        'Severe bleeding or major trauma',
        'Sudden severe head, neck, or back pain',
      ],
      promise: 'Average same-day wait at theCLINICS, 14 minutes.',
    },
    locations: {
      eyebrow: 'Visit',
      title_a: 'Two clinics,',
      title_em: 'one standard',
      title_b: 'of care.',
      lead: 'Alexandria and Pineville. Open-now status, drive times, direct phone.',
      drive_label: 'Drive time from your zip',
      drive_placeholder: 'ZIP code',
      drive_button: 'Calculate',
      directions: 'Directions',
      call: 'Call clinic',
      live_wait: 'live wait',
      open_now: 'Open now',
      closed_now: 'Closed',
    },
    team: {
      eyebrow: 'Care team',
      title_a: 'Clinicians who know Cenla',
      title_em: 'by name',
      title_b: '.',
      lead:
        'Board-certified physicians and nurse practitioners who chose to live and serve in Central Louisiana.',
      filters_all: 'All providers',
      filters_primary: 'Primary care',
      filters_pediatrics: 'Pediatrics',
      filters_urgent: 'Same-day',
      filters_womens: 'Women health',
      schedule_with: 'Schedule with this provider',
      accepting: 'Accepting new patients',
      founder: 'Founder',
      bios: 'Read full bios',
    },
    founder: {
      eyebrow: 'A note from the team',
      letter:
        'Cenla deserves better than long drives and longer waits. We chose to stay, to listen, and to build the clinic our families would trust. Every patient is a neighbor here. We will earn your visit, every visit.',
      sig: 'theCLINICS care team',
      title: 'Cenla Family Medicine Associates',
    },
    reviews: {
      eyebrow: 'Patient stories',
      title_a: 'Care that',
      title_em: 'earns the recommendation',
      title_b: '.',
      avg: '4.8 average across patient reviews',
      readmore: 'Read more on Google',
    },
    faq: {
      eyebrow: 'Frequently asked',
      title_a: 'Quick answers,',
      title_em: 'before your visit',
      title_b: '.',
      lead:
        'Cannot find what you are looking for? Call (318) 445-9823 directly. The team is ready to help.',
    },
    resources: {
      eyebrow: 'Resources',
      title_a: 'Reading worth your',
      title_em: '5 minutes',
      title_b: '.',
      lead: 'Plain-language guides from our care team, refreshed each season.',
      readmin: 'min read',
    },
    careers: {
      eyebrow: 'Careers',
      title: 'Want to practice medicine the way it was meant to be practiced?',
      lead: 'We are hiring providers and staff who want to build something they are proud of in Cenla.',
      cta: 'View open roles',
    },
    cta: {
      eyebrow: 'Request your visit',
      title_a: 'Ready when',
      title_em: 'you are',
      title_b: '.',
      lead:
        'Comprehensive care, pediatrics, same-day care — request your visit through the patient portal and our team replies within one business hour.',
      btn_a: 'Request a visit',
      btn_b: 'Open patient portal',
    },
    booking: {
      title: 'Request a visit',
      step1: 'Reason',
      step2: 'Provider',
      step3: 'Time',
      step4: 'Details',
      sub_reason: 'What kind of care do you need?',
      sub_location: 'Which clinic works best?',
      sub_provider: 'Pick a provider, or skip for next available.',
      sub_time: 'Choose a time that fits your week.',
      reason_primary: 'Primary care',
      reason_urgent: 'Same-day visit',
      reason_pediatrics: 'Pediatric visit',
      reason_womens: 'Women health',
      reason_other: 'Something else',
      next: 'Continue',
      back: 'Back',
      submit: 'Request visit',
      skip: 'Skip, next available',
      success_title: 'Request received',
      success_body:
        'Thanks. A care coordinator will call within one business hour to confirm.',
      success_close: 'Close',
      patient_name: 'Your full name',
      patient_phone: 'Phone we can call',
      patient_dob: 'Date of birth',
    },
    mobile: { call: 'Call', directions: 'Directions', book: 'Book' },
    sr: {
      skip: 'Skip to main content',
      lang_toggle: 'Switch language',
      open_menu: 'Open menu',
      close: 'Close',
    },
    footer: {
      care: 'Care',
      patients: 'Patients',
      hours: 'Hours',
      legal: 'Legal',
      privacy: 'Privacy',
      access: 'Accessibility',
      hipaa: 'HIPAA',
      copy: 'theCLINICS',
    },
  },
  es: {
    nav: {
      services: 'Servicios',
      team: 'Equipo',
      locations: 'Visite',
      faq: 'Preguntas',
      portal: 'Portal del Paciente',
      book: 'Reservar',
      lang: 'ES',
    },
    hero: {
      eyebrow: 'Aceptando pacientes nuevos',
      headline_a: 'Una atención',
      headline_b: 'médica',
      headline_c: 'diferente,',
      headline_d: 'hecha',
      headline_em: 'para',
      headline_f: 'Cenla.',
      mobile_hl_1: 'Experimente la diferencia Cenla',
      mobile_hl_2_before: 'Enamórese de nuevo del ',
      mobile_hl_2_em: 'cuidado de salud',
      mobile_hl_2_after: '',
      lead:
        'Brindamos atención integral — exámenes anuales, pediatría, salud de la mujer, manejo de enfermedades crónicas — más gastroenterología, podiatría y laboratorio en sitio, con clínicos que también viven en Cenla.',
      cta_primary: 'Solicitar visita',
      cta_secondary: 'Ver servicios',
      cta_tertiary: 'Atención el mismo día',
      proof_title: 'Solicitudes de visita vía el portal',
      proof_loc: 'Alexandria y Pineville',
      proof_time: 'Respuesta en una hora hábil',
      meta_open: 'Abierto',
      meta_closed: 'Cerrado',
      meta_drive: 'min en auto',
      meta_nearest: 'Nuestras clínicas',
      stats_locations: 'sedes',
      stats_providers: 'proveedores',
      stats_years: 'años en Cenla',
      stats_pcmh: 'Atención integral primero',
    },
    intent: {
      eyebrow: 'Por dónde empezar',
      title: '¿Qué le trae hoy?',
      sick: {
        t: 'Estoy enfermo hoy',
        d: 'Visitas el mismo día para pacientes establecidos vía Access2Day.',
        cta: 'Solicitar el mismo día',
      },
      primary: {
        t: 'Necesito médico de atención primaria',
        d: 'Encuentre un médico de atención primaria que acepte su seguro y su ritmo.',
        cta: 'Encontrar médico',
      },
      pediatrics: {
        t: 'Mi hijo necesita un médico',
        d: 'Chequeos, exámenes escolares y visitas por enfermedad con proveedores que atienden niños.',
        cta: 'Solicitar visita pediátrica',
      },
    },
    insurance: {
      eyebrow: 'Seguro',
      title: '¿Estamos en su red?',
      sub: 'Escriba su plan y le respondemos en segundos.',
      placeholder: 'Empiece a escribir su plan de seguro',
      yes: 'Sí, aceptamos este plan.',
      maybe: 'Podemos verificarlo en minutos, llámenos.',
      noresult: 'Díganos su plan, lo revisaremos.',
      callus: 'Llamar para verificar',
    },
    services: {
      eyebrow: 'Servicios',
      title_a: 'Atención integral,',
      title_em: 'más lo demás',
      title_b: '.',
      lead:
        'Ofrecemos una amplia gama de servicios — exámenes anuales, pediatría, salud de la mujer, enfermedades crónicas. Gastro, podiatría, laboratorio y rayos X completan el resto.',
      all: 'Ver todos los servicios',
    },
    urgent: {
      eyebrow: '¿Mismo día o ER?',
      title_a: 'Atención correcta,',
      title_em: 'lugar correcto',
      title_b: '.',
      lead: 'Cuando los segundos importan, el destino también. Esta es nuestra regla simple.',
      uc_title: 'Mismo día, con nuestro equipo',
      uc_items: [
        'Pacientes establecidos vía Access2Day',
        'Esguinces, cortes menores, laboratorio',
        'Rayos X leídos en la visita',
        'Infecciones leves, alergias, recetas',
      ],
      er_title: 'Sala de emergencias, llame al 911',
      er_items: [
        'Dolor de pecho o dificultad para respirar',
        'Síntomas de derrame, debilidad severa',
        'Sangrado severo o trauma mayor',
        'Dolor súbito severo en cabeza, cuello o espalda',
      ],
      promise: 'Espera promedio el mismo día en theCLINICS, 14 minutos.',
    },
    locations: {
      eyebrow: 'Visite',
      title_a: 'Dos clínicas,',
      title_em: 'un estándar',
      title_b: 'de atención.',
      lead: 'Alexandria y Pineville. Estado abierto ahora, tiempo en auto, teléfono directo.',
      drive_label: 'Tiempo en auto desde su código postal',
      drive_placeholder: 'Código postal',
      drive_button: 'Calcular',
      directions: 'Cómo llegar',
      call: 'Llamar a la clínica',
      live_wait: 'espera en vivo',
      open_now: 'Abierto ahora',
      closed_now: 'Cerrado',
    },
    team: {
      eyebrow: 'Equipo de atención',
      title_a: 'Clínicos que conocen Cenla',
      title_em: 'por su nombre',
      title_b: '.',
      lead:
        'Médicos certificados y enfermeros que decidieron vivir y servir en el centro de Louisiana.',
      filters_all: 'Todos',
      filters_primary: 'Atención primaria',
      filters_pediatrics: 'Pediatría',
      filters_urgent: 'Mismo día',
      filters_womens: 'Salud mujer',
      schedule_with: 'Reservar con este proveedor',
      accepting: 'Acepta pacientes nuevos',
      founder: 'Cofundador',
      bios: 'Leer biografías completas',
    },
    founder: {
      eyebrow: 'Una nota del equipo',
      letter:
        'Cenla merece más que viajes largos y esperas más largas. Decidimos quedarnos, escuchar y construir la clínica en la que confiarían nuestras propias familias.',
      sig: 'Equipo theCLINICS',
      title: 'Cenla Family Medicine Associates',
    },
    reviews: {
      eyebrow: 'Historias de pacientes',
      title_a: 'Atención que',
      title_em: 'se gana la recomendación',
      title_b: '.',
      avg: '4.8 promedio en reseñas',
      readmore: 'Más en Google',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title_a: 'Respuestas rápidas,',
      title_em: 'antes de su visita',
      title_b: '.',
      lead: '¿No encuentra lo que busca? Llame al (318) 445-9823 directamente.',
    },
    resources: {
      eyebrow: 'Recursos',
      title_a: 'Lectura que vale',
      title_em: '5 minutos',
      title_b: '.',
      lead: 'Guías claras de nuestro equipo, actualizadas cada temporada.',
      readmin: 'min de lectura',
    },
    careers: {
      eyebrow: 'Carreras',
      title: '¿Quiere ejercer la medicina como debe ejercerse?',
      lead: 'Buscamos proveedores y personal que quieran construir algo de lo que se sientan orgullosos en Cenla.',
      cta: 'Ver vacantes',
    },
    cta: {
      eyebrow: 'Solicite su visita',
      title_a: 'Listos cuando',
      title_em: 'usted lo esté',
      title_b: '.',
      lead:
        'Atención integral, pediatría, atención el mismo día — solicite su visita a través del portal y respondemos en una hora hábil.',
      btn_a: 'Solicitar visita',
      btn_b: 'Abrir portal del paciente',
    },
    booking: {
      title: 'Solicite su visita',
      step1: 'Motivo',
      step2: 'Proveedor',
      step3: 'Hora',
      step4: 'Detalles',
      sub_reason: '¿Qué tipo de atención necesita?',
      sub_location: '¿Cuál clínica le conviene más?',
      sub_provider: 'Elija un proveedor, o pase para próximo disponible.',
      sub_time: 'Elija una hora que le funcione.',
      reason_primary: 'Atención primaria',
      reason_urgent: 'Mismo día',
      reason_pediatrics: 'Visita pediátrica',
      reason_womens: 'Salud de la mujer',
      reason_other: 'Otra cosa',
      next: 'Continuar',
      back: 'Atrás',
      submit: 'Solicitar visita',
      skip: 'Pasar, próximo disponible',
      success_title: 'Solicitud recibida',
      success_body: 'Gracias. Un coordinador llamará en una hora hábil para confirmar.',
      success_close: 'Cerrar',
      patient_name: 'Su nombre completo',
      patient_phone: 'Teléfono donde llamarle',
      patient_dob: 'Fecha de nacimiento',
    },
    mobile: { call: 'Llamar', directions: 'Cómo llegar', book: 'Reservar' },
    sr: {
      skip: 'Saltar al contenido',
      lang_toggle: 'Cambiar idioma',
      open_menu: 'Abrir menú',
      close: 'Cerrar',
    },
    footer: {
      care: 'Atención',
      patients: 'Pacientes',
      hours: 'Horario',
      legal: 'Legal',
      privacy: 'Privacidad',
      access: 'Accesibilidad',
      hipaa: 'HIPAA',
      copy: 'theCLINICS',
    },
  },
} as const;

export type Locale = keyof typeof STRINGS;
export type Strings = (typeof STRINGS)['en'];

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('hh_locale') as Locale | null;
      if (saved && STRINGS[saved]) return saved;
    } catch {}
    const browser = (navigator.language || 'en').slice(0, 2);
    return browser === 'es' ? 'es' : 'en';
  });

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem('hh_locale', l);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return { locale, setLocale, t: STRINGS[locale] as Strings };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  threshold = 0.01,
) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -2% 0px' },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const visible = useScrollReveal(ref);
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`sr ${visible ? 'sr-in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...(style ?? {}) }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
