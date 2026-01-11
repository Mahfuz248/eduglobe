import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

let images: ImagePlaceholder[] | null = null;

const getImages = (): ImagePlaceholder[] => {
    if (images) {
        return images;
    }
    if (typeof window !== 'undefined') {
        const fromStorage = localStorage.getItem('galleryImages');
        if (fromStorage) {
            images = JSON.parse(fromStorage);
            return images as ImagePlaceholder[];
        }
    }
    images = data.placeholderImages;
    return images;
}


export const PlaceHolderImages: ImagePlaceholder[] = new Proxy(data.placeholderImages, {
    get: (target, prop) => {
        const allImages = getImages();
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
        return (target as any)[prop];
    },
});
