'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { translations as defaultTranslations } from '@/lib/translations';

type TranslationKeys = keyof typeof defaultTranslations.en.home.newsItems[0];

export default function SettingsPage() {
  const [translations, setTranslations] = useState(defaultTranslations);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTranslations = localStorage.getItem('translations');
    if (storedTranslations) {
      setTranslations(JSON.parse(storedTranslations));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('translations', JSON.stringify(translations));
    }
  }, [translations, isMounted]);

  const handleNewsChange = (lang: 'en' | 'bn', index: number, field: TranslationKeys, value: string) => {
    const newTranslations = { ...translations };
    (newTranslations[lang].home.newsItems[index] as any)[field] = value;
    setTranslations(newTranslations);
  };

  const saveChanges = () => {
    localStorage.setItem('translations', JSON.stringify(translations));
    alert('Changes saved successfully!');
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button onClick={saveChanges}>Save All Changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcements / Notice Board</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {translations.en.home.newsItems.map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold mb-2">Announcement {index + 1} (English)</h3>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Title"
                    value={translations.en.home.newsItems[index].title}
                    onChange={(e) => handleNewsChange('en', index, 'title', e.target.value)}
                  />
                  <Textarea
                    placeholder="Date"
                    value={translations.en.home.newsItems[index].date}
                    onChange={(e) => handleNewsChange('en', index, 'date', e.target.value)}
                  />
                  <Textarea
                    placeholder="Summary"
                    rows={4}
                    value={translations.en.home.newsItems[index].summary}
                    onChange={(e) => handleNewsChange('en', index, 'summary', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Announcement {index + 1} (Bangla)</h3>
                <div className="space-y-2">
                   <Textarea
                    placeholder="শিরোনাম"
                    value={translations.bn.home.newsItems[index].title}
                    onChange={(e) => handleNewsChange('bn', index, 'title', e.target.value)}
                  />
                  <Textarea
                    placeholder="তারিখ"
                    value={translations.bn.home.newsItems[index].date}
                    onChange={(e) => handleNewsChange('bn', index, 'date', e.target.value)}
                  />
                  <Textarea
                    placeholder="সারসংক্ষেপ"
                    rows={4}
                    value={translations.bn.home.newsItems[index].summary}
                    onChange={(e) => handleNewsChange('bn', index, 'summary', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
