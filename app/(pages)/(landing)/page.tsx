import { Button } from "@nextui-org/react";
import Link from "next/link";

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
    </main>
  );
}
