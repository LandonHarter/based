"use server";

import { Source } from "@/types/source";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeSources(sources: Source[]) {
    const context = "Write a news article based on the following sources, eliminating bias and misinformation: ";
    const content = sources.map((source) => "From " + source.source + " - " + source.content).join("\n\n");
    const prompt = context + content;

    const model = genAI.getGenerativeModel({
        model: "gemini-pro", safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE }
        ]
    });

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return {
            success: true,
            response: text
        };
    } catch (e) {
        return {
            success: false,
            response: null
        };
    }
}