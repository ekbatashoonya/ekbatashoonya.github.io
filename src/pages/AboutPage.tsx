import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { Breadcrumbs } from '@/components/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Github, Heart, Youtube, Sparkles } from 'lucide-react';
import { config } from '@/config';
import { Button } from '@/components/ui/button';

export function AboutPage() {
  const { mode } = useMode();
  const { t } = useTranslations(mode);
  const { registerPath } = useModePath();

  const content = {
    mission: {
      'hi-shuddh': 'हमारा उद्देश्य गणित को सभी के लिए सुलभ बनाना है। भाषा कोई बाधा नहीं होनी चाहिए। इसीलिए हम हिन्दी में गणितीय अवधारणाओं को प्रस्तुत करते हैं — शुद्ध हिन्दी, मिश्रित, या रोमन लिपि में।',
      'hi-mixed': 'हमारा mission है maths को सबके लिए accessible बनाना। Language कोई barrier नहीं होनी चाहिए। इसीलिए हम Hindi में mathematical concepts को present करते हैं — pure Hindi, mixed, या Roman script में।',
      'hinglish': 'Hamara mission hai maths ko sabke liye accessible banana. Language koi barrier nahi honi chahiye. Isliye hum Hindi mein mathematical concepts ko present karte hain — pure Hindi, mixed, ya Roman script mein.',
      'en': 'Our mission is to make mathematics accessible to everyone. Language should not be a barrier. That\'s why we present mathematical concepts in Hindi — in pure Hindi, mixed, or Roman script.',
    },
    bio: {
      'hi-shuddh': 'एक बटा शून्य एक समुदाय-चालित परियोजना है। हम शिक्षकों, छात्रों, और गणित प्रेमियों के एक समूह हैं जो ज्ञान को सुलभ बनाना चाहते हैं।',
      'hi-mixed': 'Ek Bata Shoonya एक community-driven project है। हम teachers, students, और maths enthusiasts का एक group हैं जो knowledge को accessible बनाना चाहते हैं।',
      'hinglish': 'Ek Bata Shoonya ek community-driven project hai. Hum teachers, students, aur maths enthusiasts ka ek group hain jo knowledge ko accessible banana chahte hain.',
      'en': 'Ek Bata Shoonya is a community-driven project. We are a group of teachers, students, and math enthusiasts who want to make knowledge accessible.',
    },
    vision: {
      'hi-shuddh': 'हमारी दृष्टि है कि प्रत्येक हिन्दी-भाषी छात्र को गुणवत्तापूर्ण गणित शिक्षा मिले, चाहे वे कहीं भी हों।',
      'hi-mixed': 'हमारी vision है कि हर Hindi-speaking student को quality maths education मिले, चाहे वे कहीं भी हों।',
      'hinglish': 'Hamari vision hai ki har Hindi-speaking student ko quality maths education mile, chahe woh kahin bhi hon.',
      'en': 'Our vision is for every Hindi-speaking student to have access to quality mathematics education, wherever they are.',
    },
  };

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('about') }]} />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('about')}</h1>
          <p className="text-lg text-muted-foreground">
            {mode === 'en' 
              ? 'Learn about Ek Bata Shoonya.'
              : mode === 'hinglish' 
              ? 'Ek Bata Shoonya ke baare mein jaanein.'
              : mode === 'hi-shuddh'
              ? 'एक बटा शून्य के बारे में जानें।'
              : 'Ek Bata Shoonya के बारे में जानें।'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              {t('missionStatement')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{content.mission[mode]}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t('vision')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{content.vision[mode]}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'en' ? 'About Us' : mode === 'hinglish' ? 'About Us' : mode === 'hi-shuddh' ? 'हमारे बारे में' : 'About Us'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{content.bio[mode]}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('contact')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href={`mailto:${config.contactEmail}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-5 w-5" />
              <span>{config.contactEmail}</span>
            </a>
            <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span>{t('suggestImprovement')}</span>
            </a>
            {config.youtubeChannelUrl && (
              <a href={config.youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
                <span>YouTube</span>
              </a>
            )}
            <div className="pt-4">
              <Button asChild className="gap-2">
                <Link to={registerPath}>
                  <Sparkles className="h-4 w-4" />
                  {t('registerInterest')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
