'use client';

import { createArticle } from "@/backend/actions/article";
import { analyzeSources } from "@/backend/ai/analyze";
import { parseResponse } from "@/backend/ai/parse";
import { Source } from "@/types/source";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AnalyzeForm() {
    const router = useRouter();

    return (
        <form action={async (data: FormData) => {
            const sources: Source[] = [];
            const analyzed = await analyzeSources(sources);
            const article = await parseResponse(sources, analyzed);
            const articleId = await createArticle(article);
            router.push(`/article/${articleId}`);
        }} className="mt-24">
            <Button color="primary" className="font-medium text-base py-[22px]" type="submit">Analyze Story</Button>
        </form>
    )
}