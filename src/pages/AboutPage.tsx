import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';
import { Breadcrumbs } from '@/components/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Github, Heart } from 'lucide-react';

export function AboutPage() {
  const { mode } = useMode();
  const { t } = useTranslations(mode);

  const content = {
    mission: {
      'hi-shuddh': 'हमारा उद्देश्य गणित को सभी के लिए सुलभ बनाना है। भाषा कोई बाधा नहीं होनी चाहिए। इसीलिए हम हिन्दी में गणितीय अवधारणाओं को प्रस्तुत करते हैं — शुद्ध हिन्दी, मिश्रित, या रोमन लिपि में।',
      'hi-mixed': 'हमारा mission है maths को सबके लिए accessible बनाना। Language कोई barrier नहीं होनी चाहिए। इसीलिए हम Hindi में mathematical concepts को present करते हैं — pure Hindi, mixed, या Roman script में।',
      'hinglish': 'Hamara mission hai maths ko sabke liye accessible banana. Language koi barrier nahi honi chahiye. Isliye hum Hindi mein mathematical concepts ko present karte hain — pure Hindi, mixed, ya Roman script mein.',
    },
    bio: {
      'hi-shuddh': 'एक बटा शून्य एक समुदाय-चालित परियोजना है। हम शिक्षकों, छात्रों, और गणित प्रेमियों के एक समूह हैं जो ज्ञान को सुलभ बनाना चाहते हैं।',
      'hi-mixed': 'Ek Bata Shoonya एक community-driven project है। हम teachers, students, और maths enthusiasts का एक group हैं जो knowledge को accessible बनाना चाहते हैं।',
      'hinglish': 'Ek Bata Shoonya ek community-driven project hai. Hum teachers, students, aur maths enthusiasts ka ek group hain jo knowledge ko accessible banana chahte hain.',
    },
  };

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('about') }]} />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('about')}</h1>
          <p className="text-lg text-muted-foreground">
            {mode === 'hinglish' 
              ? 'Ek Bata Shoonya ke baare mein jaanein.'
              : mode === 'hi-shuddh'
              ? 'एक बटा शून्य के बारे में जानें।'
              : 'Ek Bata Shoonya के बारे में जानें।'}
          </p>
        </div>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              {t('missionStatement')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {content.mission[mode]}
            </p>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'hinglish' ? 'About Us' : mode === 'hi-shuddh' ? 'हमारे बारे में' : 'About Us'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {content.bio[mode]}
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>{t('contact')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a 
              href="mailto:contact@example.com" 
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>contact@example.com</span>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>{t('suggestImprovement')}</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
