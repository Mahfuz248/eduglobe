import data from './placeholder-images.json';
import { useEffect, useState } from 'react';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// This function now uses a hook to safely access localStorage on the client.
export const useGalleryImages = () => {
  const [images, setImages] = useState<ImagePlaceholder[]>(data.placeholderImages);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fromStorage = localStorage.getItem('galleryImages');
    if (fromStorage) {
      try {
        const parsedImages = JSON.parse(fromStorage);
        // We need to merge gallery images from local storage with the base images
        const baseImages = data.placeholderImages.filter(img => !img.id.startsWith('gallery'));
        const allImages = [...baseImages, ...parsedImages.filter((img: ImagePlaceholder) => img.id.startsWith('gallery'))];
        setImages(allImages);
      } catch (e) {
        console.error("Failed to parse gallery images from localStorage", e);
        setImages(data.placeholderImages);
      }
    } else {
       setImages(data.placeholderImages);
    }
  }, []);

  const galleryImages = isMounted ? images.filter(img => img.id.startsWith('gallery')) : data.placeholderImages.filter(img => img.id.startsWith('gallery'));

  return {
    allImages: isMounted ? images : data.placeholderImages,
    galleryImages,
  };
};


let imagesCache: ImagePlaceholder[] | null = null;
const getImages = (): ImagePlaceholder[] => {
    if (typeof window === 'undefined') {
        return data.placeholderImages;
    }
    if (imagesCache) {
        return imagesCache;
    }
    const fromStorage = localStorage.getItem('galleryImages');
    if (fromStorage) {
        try {
            const galleryImages = JSON.parse(fromStorage);
            const baseImages = data.placeholderImages.filter(img => !img.id.startsWith('gallery'));
            imagesCache = [...baseImages, ...galleryImages.filter((img: ImagePlaceholder) => img.id.startsWith('gallery'))];
            return imagesCache;
        } catch (e) {
            console.error("Failed to parse gallery images from localStorage", e);
            imagesCache = data.placeholderImages;
            return imagesCache;
        }
    }
    imagesCache = data.placeholderImages;
    return imagesCache;
}


// The proxy will now use a more robust getter that is safer for SSR.
export const PlaceHolderImages: ImagePlaceholder[] = new Proxy(data.placeholderImages, {
    get: (target, prop) => {
        const allImages = getImages();
        
        if (prop === Symbol.iterator) {
            return allImages[Symbol.iterator].bind(allImages);
        }
        
        if (prop === 'length') {
            return allImages.length;
        }
        if (prop === 'filter') {
            return (cb: (img: ImagePlaceholder) => boolean) => allImages.filter(cb);
        }
         if (prop === 'find') {
            return (cb: (img: ImagePlaceholder) => boolean) => allImages.find(cb);
        }
        if (prop === 'map') {
            return (cb: (img: ImagePlaceholder) => any) => allImages.map(cb);
        }
        const index = parseInt(prop as string);
        if (!isNaN(index)) {
            return allImages[index];
        }
        return Reflect.get(target, prop);
    },
});
