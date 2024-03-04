"use server";

import { getAdmin } from "./admin";

const admin = getAdmin();
export async function getKeys() {
    const keys = admin.firestore().doc("keys/server");
    const doc = await keys.get();
    return doc.data();
}