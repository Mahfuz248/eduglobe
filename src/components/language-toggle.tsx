'use client';
import { useLanguage, Language } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/translations';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].languageToggle;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center rounded-md border p-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'px-3 py-1 text-sm',
          language === 'en' ? 'bg-muted text-primary' : 'text-muted-foreground'
        )}
        onClick={() => handleLanguageChange('en')}
      >
        {t.en}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'px-3 py-1 text-sm',
          language === 'bn' ? 'bg-muted text-primary' : 'text-muted-foreground'
        )}
        onClick={() => handleLanguageChange('bn')}
      >
        <span className="font-bangla">{t.bn}</span>
      </Button>
    </div>
  );
}
