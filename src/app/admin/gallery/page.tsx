'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Trash2, Upload } from 'lucide-react';
import {
  PlaceHolderImages as defaultImages,
  type ImagePlaceholder,
} from '@/lib/placeholder-images';

export default function GalleryPage() {
  const [images, setImages] = useState<ImagePlaceholder[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [newImage, setNewImage] = useState({
    imageUrl: '',
    description: '',
    imageHint: ''
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const storedImages = localStorage.getItem('galleryImages');
    const galleryImages = storedImages ? JSON.parse(storedImages) : defaultImages.filter(img => img.id.startsWith('gallery'));
    setImages(galleryImages);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('galleryImages', JSON.stringify(images));
    }
  }, [images, isMounted]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddImage = () => {
    if (!newImage.imageUrl || !newImage.description) {
      alert('Please provide an image and description.');
      return;
    }
    const newImageObject: ImagePlaceholder = {
      id: `gallery${Date.now()}`,
      ...newImage,
    };
    setImages([...images, newImageObject]);
    setNewImage({ imageUrl: '', description: '', imageHint: '' });
    setFile(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
        setImages(images.filter((img) => img.id !== id));
    }
  };

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Gallery</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add New Image</h3>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <div className="flex items-center gap-4">
                    <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="flex-grow"/>
                    <Button size="icon" variant="outline" onClick={() => document.getElementById('picture')?.click()}>
                        <Upload className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {newImage.imageUrl && <Image src={newImage.imageUrl} alt="preview" width={100} height={100} className="rounded-md object-cover" />}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newImage.description}
                onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                placeholder="e.g., Annual sports day"
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="imageHint">AI Hint</Label>
              <Input
                id="imageHint"
                value={newImage.imageHint}
                onChange={(e) => setNewImage({ ...newImage, imageHint: e.target.value })}
                placeholder="e.g., sports day"
              />
            </div>
            <Button onClick={handleAddImage}>Add Image</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Current Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                <div key={image.id} className="relative group">
                    <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={200}
                    height={200}
                    className="w-full h-auto aspect-square object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(image.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{image.description}</p>
                </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
