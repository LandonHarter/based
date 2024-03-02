import type { Metadata } from 'next';
import './globals.css';
import Providers from './components/providers';
import Header from './components/header/header';

export const metadata: Metadata = {
  title: 'Based | The No BS News Source',
  description: 'Let AI rewrite a collection of news articles to be more based. No BS, just the facts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
