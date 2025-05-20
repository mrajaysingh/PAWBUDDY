import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PreloaderWrapper from '../components/PreloaderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pet-Friendly City Initiative',
  description: 'Building cities where every paw matters - join our movement to create pet-friendly urban spaces',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <PreloaderWrapper>{children}</PreloaderWrapper>
      </body>
    </html>
  );
}