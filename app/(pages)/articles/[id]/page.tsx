import { getArticle, getSourceIcon } from "@/backend/db/articles";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ArticlePage(context: { params: { id: string } }) {
    const article = await getArticle(context.params.id);

    if (!article) {
        redirect("/");
    }

    return (
        <main className="w-screen flex flex-col items-center">
            <article className="w-5/6 max-w-[1200px] flex flex-col mt-24 mb-8">
                <h1 className="text-6xl font-bold mb-8 leading-[80px]">{article.title}</h1>

                {article.image != "/misc/missing.jpg" &&
                    <div className="rounded-2xl w-full h-[450px] max-h-[450px] object-contain mb-8" style={{
                        backgroundImage: `url(${article.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }} />
                }

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

            <div className="w-5/6 max-w-[1200px] flex flex-col border-2 border-gray-300 mb-24 p-4 rounded-2xl">
                <h1 className="mb-4 text-4xl font-medium">Sources</h1>
                <div className="w-full flex flex-wrap gap-2">
                    {article.sources.map((source, index) => (
                        <Link href={source} target="_blank" key={index} className="flex items-center p-4 border-2 border-gray-200 rounded-xl">
                            <Image src={getSourceIcon(source)} alt={source} width={50} height={50} className="mr-4 rounded-[100%]" />
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">{new URL(source).hostname.replaceAll("www.", "")}</p>
                                <p className="text-lg text-gray-500">Read Article</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}