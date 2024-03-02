import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Article } from "@/types/article";
import { createCache, defaultCacheOptions } from "./cache";

const articles = createCache<Article>();
export async function getArticle(id: string, cacheOptions = defaultCacheOptions) {
    if (cacheOptions.enabled) {
        const cached = articles.get(id);
        if (cached && !cacheOptions.forceRefresh) {
            return cached;
        }
    }

    const ref = doc(collection(firestore, "articles"), id);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        const article = {
            id: docSnap.id,
            ...docSnap.data(),
        } as Article;

        if (cacheOptions.enabled) articles.add(id, article);
        return article;
    } else {
        return null;
    }
}