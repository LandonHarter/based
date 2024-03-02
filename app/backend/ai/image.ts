"use server";

import GoogleImages from 'google-images';
const client = new GoogleImages(process.env.CSE_ID!, process.env.NEXT_PUBLIC_FIREBASE_API_KEY!);

export async function generateImage(title: string) {
    const images = await client.search(title, {
        safe: "high"
    });
    return images[0].url;
}