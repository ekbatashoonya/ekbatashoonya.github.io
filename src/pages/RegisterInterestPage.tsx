import { useState, useEffect } from 'react';
import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';
import { config } from '@/config';
import { analytics } from '@/lib/analytics';
import type { LanguageMode } from '@/lib/modes';
import { Breadcrumbs } from '@/components/content';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const formLabels: Record<LanguageMode, string> = {
  'hi-shuddh': 'हिन्दी (शुद्ध)',
  'hi-mixed': 'Hindi + English',
  'hinglish': 'Hinglish (Roman)',
  'en': 'English',
};

const getEmbedUrl = (url: string) => {
  // Convert short forms.gle links — they redirect, but for embed we need the full URL
  // Google Forms embed works by appending ?embedded=true
  if (url.includes('forms.gle/')) {
    return url;
  }
  return url + (url.includes('?') ? '&embedded=true' : '?embedded=true');
};

export function RegisterInterestPage() {
  const { mode } = useMode();
  const { t } = useTranslations(mode);
  const [selectedLang, setSelectedLang] = useState<LanguageMode | null>(null);
  const [showPicker, setShowPicker] = useState(true);

  const heading = {
    'hi-shuddh': 'अपनी भाषा चुनें',
    'hi-mixed': 'अपनी language चुनें',
    'hinglish': 'Apni language chunein',
    'en': 'Choose your language',
  };

  const description = {
    'hi-shuddh': 'रुचि दर्ज करने के लिए नीचे अपनी पसन्दीदा भाषा चुनें।',
    'hi-mixed': 'Interest register करने के लिए अपनी पसन्दीदा language चुनें।',
    'hinglish': 'Interest register karne ke liye apni pasandida language chunein.',
    'en': 'Select your preferred language to register your interest.',
  };

  const pageSubtitle = {
    'hi-shuddh': 'नए वीडियो, टिप्पणियाँ, और पाठ्यक्रमों की सूचना प्राप्त करने के लिए रुचि दर्ज करें।',
    'hi-mixed': 'नए videos, notes, और courses की notification पाने के लिए interest register करें।',
    'hinglish': 'Naye videos, notes, aur courses ki notification paane ke liye interest register karein.',
    'en': 'Register your interest to get notified about new videos, notes, and courses.',
  };

  // Show picker on first load
  useEffect(() => {
    setShowPicker(true);
  }, []);

  const handleSelect = (langMode: LanguageMode) => {
    analytics.registerInterestClick();
    setSelectedLang(langMode);
    setShowPicker(false);
  };

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 flex flex-col flex-1">
      <Breadcrumbs items={[{ label: t('registerInterest') }]} />

      <div className="flex flex-col flex-1">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('registerInterest')}</h1>
          <p className="text-lg text-muted-foreground">{pageSubtitle[mode]}</p>
        </div>

        {selectedLang ? (
          <div className="flex flex-col flex-1 min-h-[60vh]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-muted-foreground">{formLabels[selectedLang]}</span>
              <Button variant="outline" size="sm" onClick={() => setShowPicker(true)}>
                {mode === 'en' ? 'Change language' : mode === 'hinglish' ? 'Language badlein' : mode === 'hi-shuddh' ? 'भाषा बदलें' : 'Language बदलें'}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={config.googleFormUrls[selectedLang]} target="_blank" rel="noopener noreferrer">
                  {mode === 'en' ? 'Open in new tab' : mode === 'hinglish' ? 'New tab mein kholein' : mode === 'hi-shuddh' ? 'नए टैब में खोलें' : 'New tab में खोलें'}
                </a>
              </Button>
            </div>
            <iframe
              src={getEmbedUrl(config.googleFormUrls[selectedLang])}
              className="flex-1 w-full border border-border rounded-lg min-h-[60vh]"
              title="Register Interest Form"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 min-h-[40vh]">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">{description[mode]}</p>
              <div className="flex flex-col gap-2 max-w-xs mx-auto">
                {(Object.keys(config.googleFormUrls) as LanguageMode[]).map((langMode) => (
                  <Button
                    key={langMode}
                    variant={langMode === mode ? 'default' : 'outline'}
                    className="w-full justify-start gap-2"
                    onClick={() => handleSelect(langMode)}
                  >
                    <Sparkles className="h-4 w-4" />
                    {formLabels[langMode]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Language picker popup */}
      <Dialog open={showPicker && selectedLang !== null} onOpenChange={(open) => { if (!open) setShowPicker(false); }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">{heading[mode]}</DialogTitle>
            <DialogDescription className="text-center">{description[mode]}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2">
            {(Object.keys(config.googleFormUrls) as LanguageMode[]).map((langMode) => (
              <Button
                key={langMode}
                variant={langMode === (selectedLang ?? mode) ? 'default' : 'outline'}
                className="w-full justify-start gap-2"
                onClick={() => handleSelect(langMode)}
              >
                <Sparkles className="h-4 w-4" />
                {formLabels[langMode]}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
