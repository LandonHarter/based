import { getArticle } from "@/backend/db/articles";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ArticlePage(context: { params: { id: string } }) {
    const article = await getArticle(context.params.id);

    if (!article) {
        redirect("/");
    }

    return (
        <main className="w-screen flex flex-col items-center">
            <article className="w-5/6 max-w-[1200px] flex flex-col mt-24">
                <h1 className="text-6xl font-bold mb-8 leading-[80px]">{article.title.replaceAll("*", "")}</h1>

                <div className="mb-8 flex items-center">
                    <div className="border-2 border-gray-300 rounded-[100%] p-1">
                        <Image src="/icons/ai.png" alt="AI" width={45} height={45} className="rounded-[100%]" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold ml-4">Summarized by AI</p>
                        <p className="text-lg ml-4 text-gray-500">{article.date.toDateString()}</p>
                    </div>
                </div>

                {article.content.split("\n").map((paragraph, index) => (
                    <section className="mb-4" key={index}>
                        <p className="text-xl">{paragraph}</p>
                    </section>
                ))}
            </article>
        </main>
    );
}