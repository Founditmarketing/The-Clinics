import { GoogleGenAI } from "@google/genai";
import { DOCTORS, SERVICES } from '../data/clinicData';

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Construct a context string from our data
const doctorsList = DOCTORS.map(d => `${d.name} (${d.specialty})`).join(', ');
const servicesList = SERVICES.map(s => s.title).join(', ');

export const generateHealthResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my AI connection is currently unavailable. Please contact the clinic directly at (318) 445-9823.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: userMessage,
      config: {
        systemInstruction: `You are 'Clara', the AI Health Assistant for 'The Clinics'.
        
        CONTEXT DATA:
        - Our Doctors: ${doctorsList}
        - Our Services: ${servicesList}
        - Location: 1587 N Bolton Ave, Alexandria, LA 71303
        - Hours: Mon-Thu 7:45am-5pm, Fri 7:45am-12pm, Sat-Sun Closed.
        
        YOUR GOAL:
        Help patients navigate the website, understand our specific services, and find the right doctor.
        
        CRITICAL RULES:
        1. DO NOT provide specific medical diagnoses. Always advise the user to book an appointment.
        2. Be professional, empathetic, and concise.
        3. Use simple markdown for formatting: use **bold** for key terms and *italics* for emphasis. Use lists where appropriate.
        4. If asked about a service we don't list, politely inform them we don't currently offer it.
        `,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
};