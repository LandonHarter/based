"use server";

import { Source } from "@/types/source";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeSources(sources: Source[]) {
    const context = "Write a news article based on the following sources, eliminating bias and misinformation: ";
    const content = sources.map((source) => "From " + source.source + " - " + source.content).join("\n\n");
    const prompt = context + content;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    for (let i = 0; i < model.safetySettings.length; i++) model.safetySettings[i].threshold = HarmBlockThreshold.BLOCK_NONE;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text;
}