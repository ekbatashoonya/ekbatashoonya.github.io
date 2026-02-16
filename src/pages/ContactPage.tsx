import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { Breadcrumbs } from '@/components/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { config } from '@/config';
import { Mail, Github, Youtube, Sparkles, Twitter, Instagram } from 'lucide-react';

export function ContactPage() {
  const { mode } = useMode();
  const { t } = useTranslations(mode);
  const { registerPath } = useModePath();

  const content = {
    'en': {
      title: 'Contact',
      subtitle: 'Get in touch with us',
      emailTitle: 'Email',
      emailDesc: 'For questions, feedback, or data deletion requests',
      githubTitle: 'GitHub',
      githubDesc: 'Report issues or suggest improvements',
      youtubeTitle: 'YouTube',
      youtubeDesc: 'Subscribe for video content',
      twitterTitle: 'Twitter / X',
      twitterDesc: 'Follow for updates and discussions',
      instagramTitle: 'Instagram',
      instagramDesc: 'Follow for visual content and updates',
      registerTitle: 'Register Interest',
      registerDesc: 'Get notified about new content',
    },
    'hi-mixed': {
      title: 'Contact',
      subtitle: 'हमसे संपर्क करें',
      emailTitle: 'Email',
      emailDesc: 'Questions, feedback, या data deletion requests के लिए',
      githubTitle: 'GitHub',
      githubDesc: 'Issues report करें या improvements suggest करें',
      youtubeTitle: 'YouTube',
      youtubeDesc: 'Video content के लिए subscribe करें',
      twitterTitle: 'Twitter / X',
      twitterDesc: 'Updates और discussions के लिए follow करें',
      instagramTitle: 'Instagram',
      instagramDesc: 'Visual content और updates के लिए follow करें',
      registerTitle: 'Interest Register करें',
      registerDesc: 'नए content की notification पाएँ',
    },
    'hinglish': {
      title: 'Contact',
      subtitle: 'Humse contact karein',
      emailTitle: 'Email',
      emailDesc: 'Questions, feedback, ya data deletion requests ke liye',
      githubTitle: 'GitHub',
      githubDesc: 'Issues report karein ya improvements suggest karein',
      youtubeTitle: 'YouTube',
      youtubeDesc: 'Video content ke liye subscribe karein',
      twitterTitle: 'Twitter / X',
      twitterDesc: 'Updates aur discussions ke liye follow karein',
      instagramTitle: 'Instagram',
      instagramDesc: 'Visual content aur updates ke liye follow karein',
      registerTitle: 'Interest Register karein',
      registerDesc: 'Naye content ki notification paayein',
    },
    'hi-shuddh': {
      title: 'सम्पर्क',
      subtitle: 'हमसे सम्पर्क करें',
      emailTitle: 'ईमेल',
      emailDesc: 'प्रश्न, प्रतिक्रिया, या डेटा विलोपन अनुरोध के लिए',
      githubTitle: 'गिटहब',
      githubDesc: 'समस्याएँ रिपोर्ट करें या सुधार सुझाएँ',
      youtubeTitle: 'यूट्यूब',
      youtubeDesc: 'वीडियो सामग्री के लिए सदस्यता लें',
      twitterTitle: 'ट्विटर / एक्स',
      twitterDesc: 'अद्यतन और चर्चा के लिए अनुसरण करें',
      instagramTitle: 'इंस्टाग्राम',
      instagramDesc: 'दृश्य सामग्री और अद्यतन के लिए अनुसरण करें',
      registerTitle: 'रुचि दर्ज करें',
      registerDesc: 'नई सामग्री की सूचना प्राप्त करें',
    },
  };

  const pageContent = content[mode];
  const hasYoutubeUrl = config.youtubeChannelUrl && config.youtubeChannelUrl.length > 0;

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('contact') }]} />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{pageContent.title}</h1>
          <p className="text-lg text-muted-foreground">{pageContent.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{pageContent.emailTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{pageContent.emailDesc}</p>
              <Button variant="outline" asChild className="w-full">
                <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{pageContent.githubTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{pageContent.githubDesc}</p>
              <Button variant="outline" asChild className="w-full">
                <a href={config.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                  <Youtube className="h-5 w-5 text-red-600" />
                </div>
                <CardTitle className="text-lg">{pageContent.youtubeTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{pageContent.youtubeDesc}</p>
              <Button variant="outline" asChild className="w-full">
                <a href={config.youtubeChannelUrl} target="_blank" rel="noopener noreferrer">YouTube</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Twitter className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle className="text-lg">{pageContent.twitterTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{pageContent.twitterDesc}</p>
              <Button variant="outline" asChild className="w-full">
                <a href={config.twitterUrl} target="_blank" rel="noopener noreferrer">Twitter / X</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <Instagram className="h-5 w-5 text-pink-600" />
                </div>
                <CardTitle className="text-lg">{pageContent.instagramTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{pageContent.instagramDesc}</p>
              <Button variant="outline" asChild className="w-full">
                <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{pageContent.registerTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{pageContent.registerDesc}</p>
              <Button className="w-full" asChild>
                <Link to={registerPath}>{t('registerInterest')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
