import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';

interface LectureNavProps {
  prevLecture?: {
    title: string;
    href: string;
  };
  nextLecture?: {
    title: string;
    href: string;
  };
}

export function LectureNav({ prevLecture, nextLecture }: LectureNavProps) {
  const { mode } = useMode();
  const { t } = useTranslations(mode);

  return (
    <nav className="flex justify-between items-center mt-12 pt-6 border-t border-border">
      {prevLecture ? (
        <Button variant="outline" asChild className="gap-2">
          <Link to={prevLecture.href}>
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{t('previous')}: </span>
            <span className="max-w-[150px] truncate">{prevLecture.title}</span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextLecture ? (
        <Button variant="outline" asChild className="gap-2">
          <Link to={nextLecture.href}>
            <span className="hidden sm:inline">{t('next')}: </span>
            <span className="max-w-[150px] truncate">{nextLecture.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </nav>
  );
}
