import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { analytics } from '@/lib/analytics';
import { config } from '@/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BookOpen, 
  FileText, 
  ArrowRight, 
  Users, 
  Lightbulb, 
  Compass,
  Youtube,
  Video,
  FileDown,
  Brain,
  Sparkles,
  Clock,
  Play
} from 'lucide-react';
import { courses } from '@/content/data';
import heroLogo from '@/assets/hero-logo.png';

export function HomePage() {
  const { mode } = useMode();
  const { coursesPath, notesPath, getPath } = useModePath();
  const { t } = useTranslations(mode);

  const featureCards = [
    {
      icon: Lightbulb,
      title: mode === 'en' ? 'What is this?' : mode === 'hinglish' ? 'Yeh kya hai?' : mode === 'hi-shuddh' ? 'यह क्या है?' : 'यह क्या है?',
      description: mode === 'en'
        ? 'A free platform that makes mathematics simple in Hindi. Every topic is explained from the basics.'
        : mode === 'hinglish' 
        ? 'Ek free platform jo maths ko Hindi mein simple banata hai. Har topic ko basics se samjhaya gaya hai.'
        : mode === 'hi-shuddh'
        ? 'एक निःशुल्क मंच जो गणित को हिन्दी में सरल बनाता है। प्रत्येक विषय को आधार से समझाया गया है।'
        : 'एक free platform जो maths को Hindi में simple बनाता है। हर topic को basics से समझाया गया है।',
    },
    {
      icon: Users,
      title: mode === 'en' ? 'Who is this for?' : mode === 'hinglish' ? 'Yeh kiske liye hai?' : mode === 'hi-shuddh' ? 'यह किसके लिए है?' : 'यह किसके लिए है?',
      description: mode === 'en'
        ? 'Students, teachers, and anyone who wants to learn mathematics in Hindi.'
        : mode === 'hinglish'
        ? 'Students, teachers, aur har woh insaan jo Hindi mein maths seekhna chahta hai.'
        : mode === 'hi-shuddh'
        ? 'छात्र, शिक्षक, और प्रत्येक वह व्यक्ति जो हिन्दी में गणित सीखना चाहता है।'
        : 'Students, teachers, और हर वो व्यक्ति जो Hindi में maths सीखना चाहता है।',
    },
    {
      icon: Compass,
      title: mode === 'en' ? 'How to use?' : mode === 'hinglish' ? 'Kaise use karein?' : mode === 'hi-shuddh' ? 'कैसे प्रयोग करें?' : 'कैसे use करें?',
      description: mode === 'en'
        ? 'Choose your preferred language, select a course, and start learning!'
        : mode === 'hinglish'
        ? 'Apni pasand ki language choose karein, course select karein, aur seekhna shuru karein!'
        : mode === 'hi-shuddh'
        ? 'अपनी पसंद की भाषा चुनें, पाठ्यक्रम चुनें, और सीखना आरम्भ करें!'
        : 'अपनी पसंद की language choose करें, course select करें, और सीखना शुरू करें!',
    },
  ];

  const roadmapItems = [
    {
      icon: Youtube,
      title: mode === 'en' ? 'YouTube Channel Launch' : mode === 'hinglish' ? 'YouTube Channel Launch' : mode === 'hi-shuddh' ? 'यूट्यूब चैनल प्रारम्भ' : 'YouTube Channel Launch',
      status: 'coming-soon' as const,
    },
    {
      icon: Video,
      title: mode === 'en' ? 'Logic Lecture 0 Video Series' : mode === 'hinglish' ? 'Logic Lecture 0 Video Series' : mode === 'hi-shuddh' ? 'तर्कशास्त्र व्याख्यान ० वीडियो श्रृंखला' : 'Logic Lecture 0 Video Series',
      status: 'coming-soon' as const,
    },
    {
      icon: FileDown,
      title: mode === 'en' ? 'Downloadable PDFs + LaTeX Notes' : mode === 'hinglish' ? 'Downloadable PDFs + LaTeX Notes' : mode === 'hi-shuddh' ? 'डाउनलोड करने योग्य पीडीएफ़ और लाटेक्स टिप्पणियाँ' : 'Downloadable PDFs + LaTeX Notes',
      status: 'coming-soon' as const,
    },
    {
      icon: BookOpen,
      title: mode === 'en' ? 'Exercises & Practice Sets' : mode === 'hinglish' ? 'Exercises & Practice Sets' : mode === 'hi-shuddh' ? 'अभ्यास प्रश्न और अभ्यास सेट' : 'Exercises & Practice Sets',
      status: 'coming-soon' as const,
    },
    {
      icon: Brain,
      title: mode === 'en' ? 'Interactive Tools / AI Tutor' : mode === 'hinglish' ? 'Interactive Tools / AI Tutor' : mode === 'hi-shuddh' ? 'संवादात्मक उपकरण / एआई शिक्षक' : 'Interactive Tools / AI Tutor',
      status: 'later' as const,
    },
  ];

  const hasYoutubeUrl = config.youtubeChannelUrl && config.youtubeChannelUrl.length > 0;

  const handleYoutubeClick = () => {
    analytics.youtubeClick();
    if (hasYoutubeUrl) {
      window.open(config.youtubeChannelUrl, '_blank');
    }
  };

  const handleRegisterInterest = () => {
    analytics.registerInterestClick();
    if (config.googleFormUrl) {
      window.open(config.googleFormUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-accent to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <Badge variant="secondary" className="px-4 py-1 text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              {t('comingSoon')}
            </Badge>
            <img src={heroLogo} alt="एक बटा शून्य" className="h-40 w-40 md:h-52 md:w-52" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-in">
              {mode === 'hinglish' || mode === 'en' ? 'Ek Bata Shoonya' : 'एक बटा शून्य'}
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

      {/* YouTube-First Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                <Youtube className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{t('youtubeFirst')}</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              {t('youtubeFirstDesc')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Video Placeholder */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted relative flex items-center justify-center">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Play className="h-12 w-12 mb-2 opacity-50" />
                    <p className="text-sm">{t('latestVideo')}</p>
                  </div>
                  <Skeleton className="absolute inset-4" />
                </div>
              </Card>

              {/* Subscribe CTA */}
              <div className="space-y-6">
                <Button 
                  size="lg" 
                  className="gap-2 bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                  onClick={handleYoutubeClick}
                  disabled={!hasYoutubeUrl}
                >
                  <Youtube className="h-5 w-5" />
                  {t('subscribeYoutube')}
                </Button>
                {!hasYoutubeUrl && (
                  <p className="text-sm text-muted-foreground">
                    {t('comingSoon')}
                  </p>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleRegisterInterest}
                >
                  <Sparkles className="h-5 w-5" />
                  {t('registerInterest')}
                </Button>
              </div>
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

      {/* Roadmap Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {t('roadmap')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {roadmapItems.map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <item.icon className="h-6 w-6 text-primary" />
                    <Badge 
                      variant={item.status === 'coming-soon' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {item.status === 'coming-soon' ? (
                        <><Clock className="w-3 h-3 mr-1" />{t('comingSoon')}</>
                      ) : (
                        mode === 'en' ? 'Later' : mode === 'hinglish' ? 'Baad mein' : mode === 'hi-shuddh' ? 'बाद में' : 'Later'
                      )}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {mode === 'en' ? 'Featured Courses' : mode === 'hinglish' ? 'Featured Courses' : mode === 'hi-shuddh' ? 'प्रमुख पाठ्यक्रम' : 'Featured Courses'}
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
                    <Link to={getPath(`courses/${course.slug}`)}>
                      {mode === 'en' ? 'View Course' : mode === 'hinglish' ? 'View Course' : mode === 'hi-shuddh' ? 'पाठ्यक्रम देखें' : 'Course देखें'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Register Interest CTA */}
      <section className="py-16 md:py-20 bg-accent/50">
        <div className="container px-4 md:px-6">
          <Card className="max-w-xl mx-auto border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('launchingSoon')}</CardTitle>
              <CardDescription>
                {mode === 'en'
                  ? 'Get notified when we launch new videos, notes, and courses.'
                  : mode === 'hinglish' 
                  ? 'Naye videos, notes, aur courses ke updates paayein.'
                  : mode === 'hi-shuddh'
                  ? 'नए वीडियो, टिप्पणियाँ, और पाठ्यक्रमों के अद्यतन प्राप्त करें।'
                  : 'नए videos, notes, और courses के updates पाएँ।'}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={handleRegisterInterest}
              >
                <Sparkles className="h-5 w-5" />
                {t('registerInterest')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
