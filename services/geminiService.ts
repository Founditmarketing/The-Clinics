import { GoogleGenAI } from '@google/genai';
import { DOCTORS, SERVICES, CLINIC } from '../data/clinicData';
import { TriageRecommendation } from '../types';

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

const doctorsList = DOCTORS.map((d) => `${d.name} (${d.specialty})`).join(', ');
const servicesList = SERVICES.map((s) => s.title).join(', ');

/* ------------------------------------------------------------------
   Conversational chat assistant (Clara)
   ------------------------------------------------------------------ */

export const generateHealthResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return `I'm sorry, my AI connection is currently unavailable. Please contact the clinic directly at ${CLINIC.phone}.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: userMessage,
      config: {
        systemInstruction: `You are 'Clara', the AI Health Assistant for theCLINICS in ${CLINIC.city}, ${CLINIC.state}.

CONTEXT DATA:
- Our Providers: ${doctorsList}
- Our Services: ${servicesList}
- Location: ${CLINIC.address}
- Phone: ${CLINIC.phone}
- Hours: ${CLINIC.hoursLabel}

YOUR GOAL:
Help patients navigate the website, understand our specific services, and find the right provider.

CRITICAL RULES:
1. DO NOT provide specific medical diagnoses. Always advise the user to book an appointment.
2. Be professional, empathetic, and concise.
3. Use simple markdown for formatting: use **bold** for key terms and *italics* for emphasis. Use lists where appropriate.
4. If asked about a service we don't list, politely inform them we don't currently offer it.`,
      },
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
};

/* ------------------------------------------------------------------
   Structured symptom triage — drives the Harmony "Care Guide" panel
   ------------------------------------------------------------------ */

const TRIAGE_FALLBACK: TriageRecommendation = {
  service: 'primary',
  severity: 'low',
  summary: "Couldn't reach our care guide just now.",
  action: `Please call us at ${CLINIC.phone} and our team will help you decide the right kind of visit.`,
  urgency_label: 'Routine',
};

const ALLOWED_SERVICES = new Set([
  'primary',
  'urgent',
  'pediatrics',
  'gastro',
  'podiatry',
  'imaging',
  'emergency',
]);

const safeParseTriage = (raw: string): TriageRecommendation | null => {
  const cleaned = raw
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  // Find the first JSON-looking substring in case the model wraps it in prose.
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return null;

  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    if (!parsed || typeof parsed !== 'object') return null;
    if (!ALLOWED_SERVICES.has(parsed.service)) return null;
    return {
      service: parsed.service,
      severity: parsed.severity ?? 'low',
      summary: String(parsed.summary ?? '').slice(0, 280),
      action: String(parsed.action ?? '').slice(0, 360),
      urgency_label: String(parsed.urgency_label ?? 'Routine').slice(0, 40),
    };
  } catch {
    return null;
  }
};

export const checkSymptom = async (symptom: string): Promise<TriageRecommendation> => {
  const trimmed = symptom.trim();
  if (!trimmed) return TRIAGE_FALLBACK;

  if (!ai) {
    return {
      ...TRIAGE_FALLBACK,
      summary: "Care guide is unavailable in this preview.",
      action: `Please call us at ${CLINIC.phone} and we'll help you decide the right kind of visit.`,
    };
  }

  try {
    const systemPrompt = `You are a triage assistant for theCLINICS in Cenla, LA (Alexandria and Pineville). We offer:
- Family Practice (about 90% of our visits — physicals, chronic care, women's health, refills, sick visits)
- Pediatrics (well-child, school physicals, sick visits)
- Same-day visits via Access2Day for established patients
- Gastroenterology (AGA)
- Podiatry
- Imaging: bone density, X-ray, pulmonary function, lab work

We do NOT have a cardiologist on staff. For cardiac concerns, route to "primary" (for routine evaluation and referral) or "emergency" (for acute chest pain, stroke, etc.).

Respond with ONLY a single JSON object, no prose, no markdown fences. Schema:
{
  "service": "primary" | "urgent" | "pediatrics" | "gastro" | "podiatry" | "imaging" | "emergency",
  "severity": "low" | "moderate" | "high",
  "summary": "1 sentence describing what you understand",
  "action": "1-2 sentences telling the patient what to do next",
  "urgency_label": "Same day" | "Within a few days" | "Routine" | "Emergency — call 911"
}

Rules:
- Stroke / heart attack / severe chest pain / severe bleeding / trouble breathing / suicidal ideation → "emergency".
- Symptom in a child under 18 → "pediatrics" (unless emergency).
- Acute fever / injury / infection → "urgent".
- Stomach / GI / reflux / colon → "gastro".
- Foot / ankle / heel → "podiatry".
- Need for X-ray / labs / pulmonary function → "imaging".
- Refills, chronic disease, screenings, non-emergent cardiac concerns → "primary".
Be warm but concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: trimmed,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = safeParseTriage(response.text || '');
    return parsed ?? TRIAGE_FALLBACK;
  } catch (error) {
    console.error('Gemini triage error:', error);
    return TRIAGE_FALLBACK;
  }
};
