import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BookOpen, FileText, ArrowRight, Users, Lightbulb, Compass } from 'lucide-react';
import { courses } from '@/content/data';

export function HomePage() {
  const { mode } = useMode();
  const { coursesPath, notesPath } = useModePath();
  const { t } = useTranslations(mode);

  const featureCards = [
    {
      icon: Lightbulb,
      title: mode === 'hinglish' ? 'Yeh kya hai?' : mode === 'hi-shuddh' ? 'यह क्या है?' : 'यह क्या है?',
      description: mode === 'hinglish' 
        ? 'Ek free platform jo maths ko Hindi mein simple banata hai. Har topic ko basics se samjhaya gaya hai.'
        : mode === 'hi-shuddh'
        ? 'एक निःशुल्क मंच जो गणित को हिन्दी में सरल बनाता है। प्रत्येक विषय को आधार से समझाया गया है।'
        : 'एक free platform जो maths को Hindi में simple बनाता है। हर topic को basics से समझाया गया है।',
    },
    {
      icon: Users,
      title: mode === 'hinglish' ? 'Yeh kiske liye hai?' : mode === 'hi-shuddh' ? 'यह किसके लिए है?' : 'यह किसके लिए है?',
      description: mode === 'hinglish'
        ? 'Students, teachers, aur har woh insaan jo Hindi mein maths seekhna chahta hai.'
        : mode === 'hi-shuddh'
        ? 'छात्र, शिक्षक, और प्रत्येक वह व्यक्ति जो हिन्दी में गणित सीखना चाहता है।'
        : 'Students, teachers, और हर वो व्यक्ति जो Hindi में maths सीखना चाहता है।',
    },
    {
      icon: Compass,
      title: mode === 'hinglish' ? 'Kaise use karein?' : mode === 'hi-shuddh' ? 'कैसे प्रयोग करें?' : 'कैसे use करें?',
      description: mode === 'hinglish'
        ? 'Apni pasand ki language choose karein, course select karein, aur seekhna shuru karein!'
        : mode === 'hi-shuddh'
        ? 'अपनी पसंद की भाषा चुनें, पाठ्यक्रम चुनें, और सीखना आरम्भ करें!'
        : 'अपनी पसंद की language choose करें, course select करें, और सीखना शुरू करें!',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-accent to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-in">
              {mode === 'hinglish' ? 'Ek Bata Shoonya' : 'एक बटा शून्य'}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild className="gap-2">
                <Link to={coursesPath}>
                  <BookOpen className="h-5 w-5" />
                  {t('startLearning')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link to={notesPath}>
                  <FileText className="h-5 w-5" />
                  {t('browseNotes')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {mode === 'hinglish' ? 'Featured Courses' : mode === 'hi-shuddh' ? 'प्रमुख पाठ्यक्रम' : 'Featured Courses'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {courses.map((course) => (
              <Card key={course.id} className="bg-card hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{course.title[mode]}</CardTitle>
                  <CardDescription>{course.description[mode]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" asChild className="p-0 h-auto gap-1">
                    <Link to={`/${mode}/courses/${course.slug}`}>
                      {mode === 'hinglish' ? 'View Course' : mode === 'hi-shuddh' ? 'पाठ्यक्रम देखें' : 'Course देखें'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <Card className="max-w-xl mx-auto bg-accent/50 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('newsletter')}</CardTitle>
              <CardDescription>
                {mode === 'hinglish' 
                  ? 'Naye lectures aur updates ke liye subscribe karein'
                  : mode === 'hi-shuddh'
                  ? 'नए व्याख्यानों और अद्यतनों के लिए सदस्यता लें'
                  : 'नए lectures और updates के लिए subscribe करें'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder={t('emailPlaceholder')} 
                  className="flex-1"
                />
                <Button type="submit">{t('subscribe')}</Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-3">
                {mode === 'hinglish' 
                  ? '(Coming soon - backend required)'
                  : mode === 'hi-shuddh'
                  ? '(शीघ्र आ रहा है)'
                  : '(Coming soon)'}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
