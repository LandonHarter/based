import { Article } from "@/types/article";
import { Source } from "@/types/source";
import { generateId } from "@/utils/id";

export function parseResponse(sources: Source[], response: string) {
    const lines = response.split("\n");
    const article = {
        id: generateId(),
        title: lines[0],
        content: lines.slice(1).join("\n"),
        date: new Date(),
        sources: sources.map((source) => source.url),
        image: "/misc/missing.jpg"
    } as Article;

    return article;
}