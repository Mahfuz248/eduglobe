import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'EduGlobe - Your Modern School',
  description: 'A modern, bilingual, and responsive school website.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
