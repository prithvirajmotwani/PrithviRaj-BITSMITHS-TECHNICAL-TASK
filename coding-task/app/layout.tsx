import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Hacker News Clone',
  description: 'A simplified Hacker News clone using Next.js App Router',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f6f6ef] text-sm">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-6 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
