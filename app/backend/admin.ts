import * as admin from 'firebase-admin';

const cert = admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
});

export function getAdmin() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: cert,
            serviceAccountId: process.env.FIREBASE_CLIENT_EMAIL,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    }

    return admin;
}