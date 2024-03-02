'use server';

import { Article } from "@/types/article";
import { getAdmin } from "../admin";

const admin = getAdmin();
export async function createArticle(article: Article) {
    const db = admin.firestore();
    const ref = db.collection('articles').doc();
    await ref.set(article);
    return ref.id;
}