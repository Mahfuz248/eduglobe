'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';
import LanguageToggle from '@/components/language-toggle';
import Logo from '@/components/logo';
import { Button } from '../ui/button';

export default function Header() {
  const { language } = useLanguage();
  const t = translations[language].nav;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/about', label: t.about },
    { href: '/results', label: t.results },
    { href: '/gallery', label: t.gallery },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 md:hidden animate-in fade-in-20 slide-in-from-top-4">
          <div className="grid gap-4 bg-background p-6 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block rounded-md p-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
