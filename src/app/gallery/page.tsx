'use client';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { useGalleryImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function GalleryPage() {
  const { language } = useLanguage();
  const t = translations[language].gallery;
  const { galleryImages } = useGalleryImages();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((image) => (
          <Card key={image.id} className="overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="aspect-w-3 aspect-h-2 relative">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  data-ai-hint={image.imageHint}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
