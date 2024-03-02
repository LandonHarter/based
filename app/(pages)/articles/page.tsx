import { getArticles } from "@/backend/db/articles";
import Link from "next/link";

export default async function ArticlesPage() {
    const articles = await getArticles();

    return (
        <main className="w-screen flex flex-col items-center">
            <h1 className="text-6xl font-bold mt-24 mb-12">New Articles</h1>
            <div className="w-5/6 max-w-[1200px] flex flex-wrap gap-2">
                {articles.map((article, index) => (
                    <Link href={`/articles/${article.id}`} key={index} className="p-4 border-2 border-gray-200 rounded-xl">
                        <h2 className="text-xl font-bold mb-2">{article.title.replaceAll("*", "")}</h2>
                        <p className="text-base text-gray-500">{article.date.toDateString()}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}