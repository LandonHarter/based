import { Button } from "@nextui-org/react";
import Link from "next/link";

/*
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBdH7Yjfgw_tkeAyq5nAinA50_JVUnJtpg"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="based-d1546.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="based-d1546"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="based-d1546.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1078659540345"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1078659540345:web:c819da4899397f2c85fba8"

GEMINI_API_KEY="AIzaSyBM1_iPNLk_Qile33BWmXKiH8NELzfgQlE"

FIREBASE_CLIENT_EMAIL="firebase-adminsdk-9g9fm@based-d1546.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCshVpNihh9+cai\nE0qNj4thHFSwskAm4AquypXP1Ox94gBZXGiGH/MzxgWpjT2Mf8K52esV/Dcr/Pk4\nzIXJtkvGtDiXLMy06OEW7SnNiDbTRuYWUvyrB5KU6MQV+D+c3LinB7y6Z3joWibS\nrSKWrvMQxA1uqZiZH8o3spj/AOpWW4JKjzcTI1OqncUbHl4RCQSanYDIcQ26UV92\nbYqhsuUul3WNBD3VB1vCOEJ+2auM4Kqg0e59UMurveeIhucR0yy8bwcNSMSdKTo9\nC2oAqPAsSFTSidttiP5FPZmMDf/mGf/vWwruW1SBRoioxRWHSFy9aHt74mK9NUT9\nimT9TcWLAgMBAAECggEAGc3Jp5wGdR6H5DQIdvXyaJr+hn3oHyhsJfVXxQHZltaC\ngNspKG6HnMXQkP9MJm3xkoS9UcjV+QwEZsdzIgF/LKrwupkmdnn343WjnAH0rqiF\nv5m4AF4d7DczJP9q3FZzKUsnTPuEV78sMV9Ys2WwJgt84CwZDpt0+TG1tTvOJmOY\naAct1TRKAZQdaiKN5kHHz0YXNPcxzpDuLk9mstb7DX5zX69Z1ttmvPndIwgRRAJQ\nNHxvCdL9tYPOcgHPxqWueIIJde1l2RguHHEvNNSqc6rF7Jk1ZvfzL+9TcOxYuVhZ\n8GYtTPsIXYLhu2Azp5n69VAIZGTxvHxMh30tsgCQKQKBgQDltgL47BMUJPjICMTP\nO5WHZm5iciIoEn5mbotacH4FjQDGMxTI/Rhh4WxLcLTJ1Ar9oqHZ2zYjrU0X8qOC\nFcgHHvxO3Pk0raN2X1fal2geRoofq7J04RXsvttkgQx158hFRGlvnvVg45+B+Gon\nhQYqziwzOfgAiOYQHeNgV71TdwKBgQDAQ86o9T09q9c10w25ZkPpio/OPvMl4+ym\n0b8u/keRH0OhTlIizpYYgKoiBOk3PfFTxsLdwZu1bjjagcffpjI9Zud389ISJ9z6\nr2X4J3y25udVfcdkLRcFp10dCSGVi3v13MMF7g3p2gAni4qv0o/9SQX33E5RfMfx\nBUAAkWDbjQKBgC3eAA3wJYcaMsrOZW3zudHFdDkYDRXvS2nsnMq8N42oMAVjYb0Y\nPGwe9N7DbHX4bxFiDetQSCkri39Cpb9t1fkGCN8+ZExOd5tFQmeVX+bbsuzL/eA0\nqYoSOgCBfBl25JhgJqVxGhH0oX70OU4W07psXIsGAi0pKLcDIMm1+0nVAoGBAJXi\nhrJ69PImC9FfJnzZd6oSJkfAFWf9htkJ/QRSoVJGUD/pQej2qlaRv5BjybgSJxeL\nhRDBxXSsZ9AYiswU0WfC2EJQJv2WbBRWNqU9i2E/IysnshCrgh4bOmDPZIojwlCK\neNMfoWMkWyh5BXZKLYxkqC1xZvDp2SlRUXLf4uVlAoGBAJZNi6VC3ikHv7jEen33\nZeoToZBYToJjVSAwsomDMaFVar4A4WsvXv2mDz1OabMoVlnClaPrqufma+0w/ODn\nRKFyLBcm74WUT1sDFk+AvzqCtfs7U+DDFgP8+IVhTflPNluGPbU4lHkAFoBjURXd\nKHZwgNClVIc5gBbL2Bfi6xvH\n-----END PRIVATE KEY-----\n"

CSE_ID="805c4789671d249ca"
*/

export default function HomePage() {
  return (
    <main className="w-screen flex flex-col items-center justify-center" style={{
      height: 'calc(80vh - 88px)',
    }}>
      <h1 className="text-6xl text-center font-semibold mb-8">No more trust issues.</h1>
      <p className="text-2xl text-center font-light text-gray-500 leading-relaxed mb-8">It&apos;s no secret that the modern media is biased.<br />Leverage <span className="font-extrabold" style={{
        background: 'linear-gradient(135deg, #004FB6 0%, #006FFF 50%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>AI</span> to get the <span className="font-extrabold" style={{
        background: 'linear-gradient(135deg, #9A8300 0%, #D9B800 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>REAL</span> story.</p>
      <div className="grid grid-cols-2 gap-2">
        <Link href="/analyze"><Button className="font-medium text-xl py-6">Analyze a Story</Button></Link>
        <Link href="/articles"><Button color="primary" className="font-medium text-xl py-6 text-white">Start Reading</Button></Link>
      </div>

      <h1>NEXT_PUBLIC_FIREBASE_API_KEY="{process.env.NEXT_PUBLIC_FIREBASE_API_KEY}"</h1>
      <h1>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="{process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}"</h1>
      <h1>NEXT_PUBLIC_FIREBASE_PROJECT_ID="{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}"</h1>
      <h1>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="{process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}"</h1>
      <h1>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="{process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}"</h1>
      <h1>NEXT_PUBLIC_FIREBASE_APP_ID="{process.env.NEXT_PUBLIC_FIREBASE_APP_ID}"</h1>
      <h1>GEMINI_API_KEY="{process.env.GEMINI_API_KEY}"</h1>
      <h1>FIREBASE_CLIENT_EMAIL="{process.env.FIREBASE_CLIENT_EMAIL}"</h1>
      <h1>CSE_ID="{process.env.CSE_ID}"</h1>
      <h1>FIREBASE_PRIVATE_KEY="{process.env.FIREBASE_PRIVATE_KEY}"</h1>
    </main>
  );
}
