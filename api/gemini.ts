import { GoogleGenAI } from '@google/genai';
import { DOCTORS, SERVICES, CLINIC } from '../data/clinicData';

/*
 * Server-side Gemini proxy.
 *
 * The API key lives ONLY here (process.env.GEMINI_API_KEY) and never reaches
 * the browser. The front-end (services/geminiService.ts) POSTs to this route.
 *
 * Runs as a Vercel serverless function in production, and via the dev
 * middleware in vite.config.ts when running `npm run dev`. Written against the
 * raw Node req/res API so it works in both environments without extra deps.
 */

// Stable, current model. (gemini-2.0-flash and the -exp variants were retired
// by Google — generateContent returns 404 "no longer available" for them.)
const MODEL = 'gemini-2.5-flash';

const doctorsList = DOCTORS.map((d) => `${d.name} (${d.specialty})`).join(', ');
const servicesList = SERVICES.map((s) => s.title).join(', ');

const CHAT_PROMPT = `You are 'Clara', the AI Health Assistant for theCLINICS in ${CLINIC.city}, ${CLINIC.state}.

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
4. If asked about a service we don't list, politely inform them we don't currently offer it.`;

const TRIAGE_PROMPT = `You are a triage assistant for theCLINICS in Cenla, LA (Alexandria and Pineville). We offer:
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

// Read a JSON body from the request. Vercel pre-parses req.body for JSON
// content; the Vite dev middleware does not, so fall back to the raw stream.
async function readJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function send(res: any, status: number, payload: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    // No key configured — the client turns this into a friendly fallback.
    return send(res, 503, { error: 'AI is not configured.' });
  }

  let body: any;
  try {
    body = await readJsonBody(req);
  } catch {
    return send(res, 400, { error: 'Invalid request body.' });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    if (body.mode === 'triage') {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: String(body.symptom || ''),
        config: { systemInstruction: TRIAGE_PROMPT, responseMimeType: 'application/json' },
      });
      return send(res, 200, { text: response.text || '' });
    }

    // Default: conversational chat (Clara)
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: String(body.message || ''),
      config: { systemInstruction: CHAT_PROMPT },
    });
    return send(res, 200, { text: response.text || '' });
  } catch (error) {
    console.error('Gemini API error:', error);
    return send(res, 502, { error: 'Upstream AI error.' });
  }
}
