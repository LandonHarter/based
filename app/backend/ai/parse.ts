import { Article } from "@/types/article";
import { generateId } from "@/utils/id";

export function parseResponse(response: string) {
    const lines = response.split("\n");
    const article = {
        id: generateId(),
        title: lines[0],
        content: lines.slice(1).join("\n"),
        date: new Date()
    } as Article;

    return article;
}