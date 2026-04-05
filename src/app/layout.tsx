import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, Outfit, Sora, ABeeZee, Bungee, Rubik_Mono_One, Russo_One, Vina_Sans, Archivo_Black, Unbounded, Syne, Titan_One, Montserrat, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

// User Requested 
const abeezee = ABeeZee({ weight: '400', subsets: ['latin'], variable: '--font-abeezee', display: 'swap' });
const bungee = Bungee({ weight: '400', subsets: ['latin'], variable: '--font-bungee', display: 'swap' });
const rubikMono = Rubik_Mono_One({ weight: '400', subsets: ['latin'], variable: '--font-rubik-mono', display: 'swap' });
const russoOne = Russo_One({ weight: '400', subsets: ['latin'], variable: '--font-russo-one', display: 'swap' });
const vinaSans = Vina_Sans({ weight: '400', subsets: ['latin'], variable: '--font-vina-sans', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-poppins', display: 'swap' });

// Super Thick & Bold (Recommendations)
const archivoBlack = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-archivo-black', display: 'swap' });
const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const titanOne = Titan_One({ weight: '400', subsets: ['latin'], variable: '--font-titan-one', display: 'swap' });

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
  const fontVars = [
    spaceGrotesk.variable, plusJakarta.variable, outfit.variable, sora.variable,
    abeezee.variable, bungee.variable, rubikMono.variable, russoOne.variable, vinaSans.variable,
    archivoBlack.variable, unbounded.variable, syne.variable, titanOne.variable,
    montserrat.variable, poppins.variable
  ].join(' ');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Supporting User Requested CSS link for Asimovian/others */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Asimovian&family=Bungee&family=Rubik+Mono+One&family=Russo+One&family=Vina+Sans&display=swap" rel="stylesheet" />
        
        {/* Load all Fontshare options */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=satoshi@300,400,500,700,900&f[]=switzer@300,400,500,700&f[]=nohemi@300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${fontVars} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
