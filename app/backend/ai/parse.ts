import { Article } from "@/types/article";
import { Source } from "@/types/source";
import { generateId } from "@/utils/id";
import { generateImage } from "./image";

export async function parseResponse(sources: Source[], response: string) {
    const lines = response.split("\n");
    const title = lines[0].replaceAll("*", "");

    let image = "/misc/missing.jpg";
    try {
        image = await generateImage(title);
    } catch (e) { }

    const article = {
        id: generateId(),
        title,
        content: lines.slice(1).join("\n"),
        date: new Date(),
        sources: sources.map((source) => source.url),
        image
    } as Article;

    return article;
}