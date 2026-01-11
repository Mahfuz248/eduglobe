'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import Logo from '@/components/logo';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/results', label: t.nav.results },
    { href: '/gallery', label: t.nav.gallery },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-muted-foreground max-w-sm">{t.footer.about}</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">{t.nav.contact}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>{t.contact.address}</li>
              <li>{t.contact.phone}</li>
              <li>{t.contact.email}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
