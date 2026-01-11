import { GraduationCap } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <GraduationCap className="h-8 w-8 text-primary" />
      <span className="font-headline text-2xl font-bold text-primary">
        EduGlobe
      </span>
    </div>
  );
}
