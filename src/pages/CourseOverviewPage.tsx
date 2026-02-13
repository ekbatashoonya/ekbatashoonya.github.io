import { useParams, Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { getCourseBySlug } from '@/content/data';
import { Breadcrumbs } from '@/components/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Lock, ArrowRight } from 'lucide-react';
import { NotAvailablePage } from './NotAvailablePage';

export function CourseOverviewPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { mode } = useMode();
  const { getPath, coursesPath } = useModePath();
  const { t } = useTranslations(mode);

  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;

  if (!course) {
    return <NotAvailablePage />;
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs 
        items={[
          { label: t('courses'), href: coursesPath },
          { label: course.title[mode] }
        ]} 
      />

      <div className="max-w-4xl">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title[mode]}</h1>
          <p className="text-lg text-muted-foreground">{course.description[mode]}</p>
        </div>

        {/* Course Overview Card */}
        <Card className="mb-8 bg-accent/30">
          <CardHeader>
            <CardTitle>{t('overview')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {mode === 'hinglish'
                ? 'Is course mein aap logic ke basic concepts seekhenge — statements, truth values, aur logical operations.'
                : mode === 'hi-shuddh'
                ? 'इस पाठ्यक्रम में आप तर्कशास्त्र की मूलभूत अवधारणाएँ सीखेंगे — कथन, सत्य-मूल्य, और तार्किक संक्रियाएँ।'
                : 'इस course में आप logic के basic concepts सीखेंगे — statements, truth values, और logical operations।'}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Badge variant="outline">
                {course.lectures.length} {mode === 'hinglish' ? 'Lectures' : mode === 'hi-shuddh' ? 'व्याख्यान' : 'Lectures'}
              </Badge>
              <Badge variant="outline">
                {mode === 'hinglish' ? 'Beginner Level' : mode === 'hi-shuddh' ? 'प्रारम्भिक स्तर' : 'Beginner Level'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Lectures List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('lectures')}</h2>
          
          <div className="space-y-3">
            {course.lectures.map((lecture) => {
              const isAvailable = lecture.availableModes.includes(mode);
              
              return (
                <Card 
                  key={lecture.id} 
                  className={`transition-all ${isAvailable ? 'hover:shadow-md' : 'opacity-60'}`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isAvailable ? (
                        <Circle className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-medium">{lecture.title[mode]}</h3>
                        {!isAvailable && (
                          <p className="text-sm text-muted-foreground">
                            {mode === 'hinglish' 
                              ? 'Coming soon' 
                              : mode === 'hi-shuddh' 
                              ? 'शीघ्र आ रहा है' 
                              : 'Coming soon'}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {isAvailable && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={getPath(`courses/${course.slug}/${lecture.slug}`)}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
