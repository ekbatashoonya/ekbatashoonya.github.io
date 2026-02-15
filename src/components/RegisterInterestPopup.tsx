import { useState } from 'react';
import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';
import { config } from '@/config';
import { analytics } from '@/lib/analytics';
import { MODES } from '@/lib/modes';
import type { LanguageMode } from '@/lib/modes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';

const formLabels: Record<LanguageMode, string> = {
  'hi-shuddh': 'हिन्दी (शुद्ध)',
  'hi-mixed': 'Hindi + English',
  'hinglish': 'Hinglish (Roman)',
  'en': 'English',
};

interface RegisterInterestPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegisterInterestPopup({ open, onOpenChange }: RegisterInterestPopupProps) {
  const { mode } = useMode();
  const { t } = useTranslations(mode);
  const [selectedLang, setSelectedLang] = useState<LanguageMode | null>(null);

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

  const handleClick = (langMode: LanguageMode) => {
    analytics.registerInterestClick();
    setSelectedLang(langMode);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) setSelectedLang(null);
    onOpenChange(isOpen);
  };

  // Convert Google Forms share URL to embeddable URL
  const getEmbedUrl = (url: string) => {
    return url.replace('/viewform', '/viewform?embedded=true').replace('forms.gle/', 'docs.google.com/forms/d/e/') + (url.includes('?') ? '&embedded=true' : '?embedded=true');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={selectedLang ? "sm:max-w-2xl h-[85vh] flex flex-col" : "sm:max-w-sm"}>
        {selectedLang ? (
          <>
            <DialogHeader className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setSelectedLang(null)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DialogTitle>{formLabels[selectedLang]}</DialogTitle>
              </div>
            </DialogHeader>
            <iframe
              src={getEmbedUrl(config.googleFormUrls[selectedLang])}
              className="flex-1 w-full border-0 rounded-md"
              title="Register Interest Form"
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">{heading[mode]}</DialogTitle>
              <DialogDescription className="text-center">
                {description[mode]}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 mt-2">
              {(Object.keys(config.googleFormUrls) as LanguageMode[]).map((langMode) => (
                <Button
                  key={langMode}
                  variant={langMode === mode ? 'default' : 'outline'}
                  className="w-full justify-start gap-2"
                  onClick={() => handleClick(langMode)}
                >
                  <Sparkles className="h-4 w-4" />
                  {formLabels[langMode]}
                </Button>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
// Hook for easy usage
export function useRegisterInterest() {
  const [open, setOpen] = useState(false);
  return { open, setOpen, trigger: () => setOpen(true) };
}
