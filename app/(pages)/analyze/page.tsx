import { analyzeSources } from "@/backend/ai/analyze";
import { parseResponse } from "@/backend/ai/parse";
import { Button } from "@nextui-org/react";
import * as admin from 'firebase-admin';
import AnalyzeForm from "./analyze";

export const metadata = {
    title: 'Analyze an Event | Based',
    description: 'Contribute to the Based community by submitting multiple news sources on the same event to help clear up bias and misinformation.'
};
export default function AnalyzePage() {
    return (
        <main>
            <AnalyzeForm />
        </main>
    );
}