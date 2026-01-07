
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;

  private constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async chat(message: string, history: { role: string, parts: { text: string }[] }[] = []) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are an expert AI assistant for "LuxeTrack OMS", a luxury Order Management System. 
        You help users analyze sales data, provide business advice for luxury retail, and answer operational questions.
        Keep your tone professional, helpful, and concise. Format your answers in markdown.`,
      },
    });

    return await chat.sendMessageStream({ message });
  }

  public async analyzeImage(base64Image: string, prompt: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
    });
    return response.text;
  }
}

export const geminiService = GeminiService.getInstance();
