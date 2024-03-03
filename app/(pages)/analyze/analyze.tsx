'use client';

import { createArticle } from "@/backend/actions/article";
import { analyzeSources } from "@/backend/ai/analyze";
import { parseResponse } from "@/backend/ai/parse";
import { Source } from "@/types/source";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalyzeForm() {
    const [sources, setSources] = useState<Source[]>([]);
    const [numCharacters, setNumCharacters] = useState(0);
    const MAX_CHARACTERS = 75000;
    const router = useRouter();

    useEffect(() => {
        let total = 0;
        for (const source of sources) {
            const aiPrompt = "From " + source.source + " - " + source.content + "\n\n";
            total += aiPrompt.length;
        }

        setNumCharacters(total);
    }, [sources]);

    return (
        <>
            <form action={async (data: FormData) => {
                const analyzed = await analyzeSources(sources);
                const article = await parseResponse(sources, analyzed);
                const articleId = await createArticle(article);
                router.push(`/article/${articleId}`);
            }} className="mt-24 flex items-center gap-2">
                <Button className="font-medium text-lg py-6" startContent={
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }>Add Source</Button>
                <Button color="primary" className="font-medium text-lg py-6" type="submit">Analyze Story</Button>
            </form>
        </>
    )
}