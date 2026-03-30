import type { Metadata } from 'next';
import { Epilogue, Space_Grotesk, Bebas_Neue, Bruno_Ace } from 'next/font/google';
import './globals.css';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const brunoAce = Bruno_Ace({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bruno-ace',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Capluk | Motion Graphic Designer',
  description: 'Portfolio of Capluk, a Motion Graphic Designer with a focus on immersive visual experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${epilogue.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} ${brunoAce.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
