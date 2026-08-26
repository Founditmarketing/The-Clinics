/*
 * Server-side Gemini proxy.
 *
 * The API key lives ONLY here (process.env.GEMINI_API_KEY) and never reaches
 * the browser. The front-end (services/geminiService.ts) POSTs to this route.
 *
 * Runs as a Vercel serverless function in production, and via the dev
 * middleware in vite.config.ts when running `npm run dev`.
 *
 * Self-contained on purpose: no imports outside /api and no SDK. Reaching out
 * to ../data or pulling in @google/genai made the bundled Vercel function
 * crash at load time (FUNCTION_INVOCATION_FAILED). We call Google's REST API
 * directly with the runtime's global fetch instead. The clinic context below
 * mirrors data/clinicData.ts — keep them in sync if providers/services change.
 */

// Stable, current model. (gemini-2.0-flash and the -exp variants were retired
// by Google — generateContent returns 404 "no longer available" for them.)
const MODEL = 'gemini-2.5-flash';

const CLINIC = {
  city: 'Alexandria',
  state: 'LA',
  address: '1587 N Bolton Ave, Alexandria, LA 71303',
  phone: '(318) 445-9823',
  hoursLabel: 'Mon–Thu · 7:45a–5p · Friday · 7:45a–12p',
};

const doctorsList = [
  'Dr. Michael G. Buck, MD (Internal & preventative medicine)',
  'Dr. William M. McBride, MD (Diversity-centered primary care)',
  'Dr. Michael Screpetis, MD (Patient-centered health management)',
  'Dr. Jonathan Hunter, MD (Wellness & community health)',
  'Dr. Beurlot, MD (Compassionate, accessible care)',
  'Dana Homer, NP (Primary care across all ages)',
  'Frances Turregano, NP (Prevention & patient education)',
].join(', ');

const servicesList = [
  'Primary Care',
  'Access2Day Health',
  'Gastroenterology (AGA)',
  'Podiatry',
  'Bone Density',
  'Pulmonary Function',
  'Lab Work',
  'X-ray Services',
].join(', ');

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
4. If asked about a service we don't list, politely inform them we don't currently offer it.
5. We do NOT offer pediatrics. Our primary care providers see patients from certain ages up and do not treat the specific needs of younger children. If someone asks about care for a child, say we do not offer pediatrics and suggest they call ${CLINIC.phone} to confirm whether we can see their child's age group.`;

const TRIAGE_PROMPT = `You are a triage assistant for theCLINICS in Cenla, LA (Alexandria and Marksville). We offer:
- Family Practice (about 90% of our visits — physicals, chronic care, women's health, refills, sick visits)
- Same-day visits via Access2Day for established patients
- Gastroenterology (AGA)
- Podiatry
- Imaging: bone density, X-ray, pulmonary function, lab work

We do NOT offer pediatrics — our primary care providers see patients from certain ages up and do not treat the specific needs of younger children.

We do NOT have a cardiologist on staff. For cardiac concerns, route to "primary" (for routine evaluation and referral) or "emergency" (for acute chest pain, stroke, etc.).

Respond with ONLY a single JSON object, no prose, no markdown fences. Schema:
{
  "service": "primary" | "urgent" | "gastro" | "podiatry" | "imaging" | "emergency",
  "severity": "low" | "moderate" | "high",
  "summary": "1 sentence describing what you understand",
  "action": "1-2 sentences telling the patient what to do next",
  "urgency_label": "Same day" | "Within a few days" | "Routine" | "Emergency — call 911"
}

Rules:
- Stroke / heart attack / severe chest pain / severe bleeding / trouble breathing / suicidal ideation → "emergency".
- Symptom in a young child → "primary", and in "action" note that we do not offer pediatrics and ask them to call ${CLINIC.phone} to confirm we can see their child's age group (unless emergency).
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
  if (typeof req.body === 'string') return req.body ? JSON.parse(req.body) : {};
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

async function callGemini(
  apiKey: string,
  systemInstruction: string,
  userText: string,
  jsonOutput: boolean,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const body: any = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents: [{ parts: [{ text: userText }] }],
  };
  if (jsonOutput) body.generationConfig = { responseMimeType: 'application/json' };

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`Gemini ${resp.status}: ${detail.slice(0, 500)}`);
  }

  const data: any = await resp.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
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

  try {
    if (body.mode === 'triage') {
      const text = await callGemini(apiKey, TRIAGE_PROMPT, String(body.symptom || ''), true);
      return send(res, 200, { text });
    }

    // Default: conversational chat (Clara)
    const text = await callGemini(apiKey, CHAT_PROMPT, String(body.message || ''), false);
    return send(res, 200, { text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return send(res, 502, { error: 'Upstream AI error.' });
  }
}
