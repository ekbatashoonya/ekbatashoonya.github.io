import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { courses } from '@/content/data';
import { Breadcrumbs } from '@/components/content';

export function CoursesPage() {
  const { mode } = useMode();
  const { getPath } = useModePath();
  const { t } = useTranslations(mode);

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('courses') }]} />
      
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('courses')}</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {mode === 'en'
            ? 'Browse all available courses. Each course contains detailed lectures.'
            : mode === 'hinglish'
            ? 'Sabhi available courses yahan dekhein. Har course mein detailed lectures hain.'
            : mode === 'hi-shuddh'
            ? 'सभी उपलब्ध पाठ्यक्रम यहाँ देखें। प्रत्येक पाठ्यक्रम में विस्तृत व्याख्यान हैं।'
            : 'सभी available courses यहाँ देखें। हर course में detailed lectures हैं।'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const availableLectures = course.lectures.filter(
            (l) => l.availableModes.includes(mode)
          );
          const totalLectures = course.lectures.length;

          return (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <Badge variant="secondary">
                    {availableLectures.length}/{totalLectures} {mode === 'en' ? 'lectures' : mode === 'hinglish' ? 'lectures' : mode === 'hi-shuddh' ? 'व्याख्यान' : 'lectures'}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {course.title[mode]}
                </CardTitle>
                <CardDescription>{course.description[mode]}</CardDescription>
              </CardHeader>
              <CardContent>
                {availableLectures.length === 0 ? (
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {t('comingSoon')}
                  </Badge>
                ) : (
                  <Link 
                    to={getPath(`courses/${course.slug}`)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t('overview')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
