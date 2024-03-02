import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase";
import { Article } from "@/types/article";
import { createCache, defaultCacheOptions } from "./cache";

const articlesCache = createCache<Article>();
export async function getArticle(id: string, cacheOptions = defaultCacheOptions) {
    if (cacheOptions.enabled) {
        const cached = articlesCache.get(id);
        if (cached && !cacheOptions.forceRefresh) {
            return cached;
        }
    }

    const ref = doc(collection(firestore, "articles"), id);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        const timestamp = docSnap.data().date as Timestamp;
        const date = timestamp.toDate();

        const article = {
            ...docSnap.data(),
            id: docSnap.id,
            date
        } as Article;

        if (cacheOptions.enabled) articlesCache.add(id, article);
        return article;
    } else {
        return null;
    }
}

export async function getArticles(cacheOptions = defaultCacheOptions) {
    const articlesQuery = query(collection(firestore, "articles"), orderBy("date", "desc"));
    const articlesSnapshot = await getDocs(articlesQuery);

    const articles: Article[] = [];
    articlesSnapshot.forEach((doc) => {
        const timestamp = doc.data().date as Timestamp;
        const date = timestamp.toDate();
        const article = {
            ...doc.data(),
            id: doc.id,
            date
        } as Article;

        articles.push(article);
        if (cacheOptions.enabled) articlesCache.add(doc.id, article);
    });

    return articles;
}

export function getSourceIcon(sourceUrl: string) {
    const url = new URL(sourceUrl);
    const domain = url.hostname;
    return `https://api.faviconkit.com/${domain}/144`;
}