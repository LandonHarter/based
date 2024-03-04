import AnalyzeForm from "./analyze";

export const metadata = {
    title: 'Analyze an Event | Based',
    description: 'Contribute to the Based community by submitting multiple news sources on the same event to help clear up bias and misinformation.'
};

export default function AnalyzePage() {
    return (
        <main className="w-screen flex flex-col items-center">
            <AnalyzeForm />
        </main>
    );
}