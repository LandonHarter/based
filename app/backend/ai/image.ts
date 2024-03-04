"use server";

import GoogleImages from 'google-images';

export async function generateImage(title: string, cseId: string) {
    const client = new GoogleImages(cseId, process.env.NEXT_PUBLIC_FIREBASE_API_KEY!);
    const images = await client.search(title, {
        safe: "high"
    });

    let maxRes = { resX: 0, index: -1 };
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.width > maxRes.resX) maxRes = { resX: image.width, index: i };
    }

    if (maxRes.index === -1) return images[0].url;
    return images[maxRes.index].url;
}