'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language].about;
  const heroImage = PlaceHolderImages.find((img) => img.id === 'about-hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-64 md:h-80 bg-primary">
        {heroImage && (
          <>
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            {t.title}
          </h1>
        </div>
      </section>

      <section id="history" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              {t.historyTitle}
            </h2>
            <p className="text-lg text-center text-muted-foreground leading-relaxed">
              {t.historyText}
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            {t.teamTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {t.teachers.map((teacher, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${teacher.name}`} alt={teacher.name} />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold font-headline">{teacher.name}</h3>
                  <p className="text-primary">{teacher.subject}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
