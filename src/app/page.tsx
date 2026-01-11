'use client';
import Image from 'next/image';
import { useFormState } from 'react-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { submitContactForm } from '@/lib/actions';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const heroImages = PlaceHolderImages.filter((img) => img.id.startsWith('hero'));
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');

  const [state, formAction] = useFormState(submitContactForm, { message: '' });

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
        <Carousel className="w-full h-full" opts={{ loop: true }} plugins={[]}>
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative h-full w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            {t.home.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl drop-shadow-md">
            {t.home.subtitle}
          </p>
          <Button variant="accent" size="lg" className="mt-8">
            {t.home.ctaButton}
          </Button>
        </div>
      </section>

      <section id="mission" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
            {t.home.missionTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.home.missionText}
          </p>
        </div>
      </section>

      <section id="news" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            {t.home.newsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.home.newsItems.map((item, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{item.date}</p>
                  <p>{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            {t.nav.contact}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-headline text-2xl font-semibold mb-6">{t.contact.infoTitle}</h3>
              <div className="space-y-6 text-lg">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1 h-6 w-6" />
                  <span>{t.contact.address}</span>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1 h-6 w-6" />
                  <span>{t.contact.phone}</span>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-1 h-6 w-6" />
                  <span>{t.contact.email}</span>
                </div>
              </div>
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                {mapImage && (
                  <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    width={800}
                    height={400}
                    className="w-full"
                    data-ai-hint={mapImage.imageHint}
                  />
                )}
              </div>
            </div>
            <div>
              <h3 className="font-headline text-2xl font-semibold mb-6">{t.contact.formTitle}</h3>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.formName}</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.formEmail}</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t.contact.formMessage}</Label>
                  <Textarea id="message" name="message" required rows={5} />
                </div>
                <Button type="submit" variant="accent" className="w-full">
                  {t.contact.formSubmit}
                </Button>
                {state.message && <p className="text-center mt-4 text-green-600">{state.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
