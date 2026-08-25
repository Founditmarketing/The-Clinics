import { CLINIC } from '../data/clinicData';
import { TriageRecommendation } from '../types';

/*
 * Client-side API for the AI assistant.
 *
 * These functions no longer talk to Google directly — that would require
 * shipping the API key to the browser. Instead they POST to /api/gemini, a
 * serverless function that holds the key server-side (see api/gemini.ts).
 */

/* ------------------------------------------------------------------
   Conversational chat assistant (Clara)
   ------------------------------------------------------------------ */

export const generateHealthResponse = async (userMessage: string): Promise<string> => {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'chat', message: userMessage }),
    });

    if (!res.ok) {
      if (res.status === 503) {
        return `I'm sorry, my AI connection is currently unavailable. Please contact the clinic directly at ${CLINIC.phone}.`;
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error('Chat error:', error);
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

  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'triage', symptom: trimmed }),
    });

    if (!res.ok) {
      if (res.status === 503) {
        return {
          ...TRIAGE_FALLBACK,
          summary: 'Care guide is unavailable right now.',
          action: `Please call us at ${CLINIC.phone} and we'll help you decide the right kind of visit.`,
        };
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    const parsed = safeParseTriage(data.text || '');
    return parsed ?? TRIAGE_FALLBACK;
  } catch (error) {
    console.error('Gemini triage error:', error);
    return TRIAGE_FALLBACK;
  }
};
