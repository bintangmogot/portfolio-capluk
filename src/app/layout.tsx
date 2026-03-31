import type { Metadata } from 'next';
import { Urbanist, Bebas_Neue, Bruno_Ace, Space_Grotesk } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
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
  icons: {
    icon: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Favicon',
    shortcut: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Favicon',
    apple: 'https://res.cloudinary.com/workstation-/image/upload/f_auto,q_auto/capluk-portfolio/Favicon',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} ${brunoAce.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
