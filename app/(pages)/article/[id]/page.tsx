import { getArticle } from "@/backend/db/articles";
import { redirect } from "next/navigation";

export default async function ArticlePage(context: { params: { id: string } }) {
    const article = await getArticle(context.params.id);

    if (!article) {
        redirect("/");
    }

    return (
        <main>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
        </main>
    );
}