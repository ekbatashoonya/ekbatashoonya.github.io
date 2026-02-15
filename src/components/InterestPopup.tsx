import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { config } from '@/config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Bell } from 'lucide-react';

export function InterestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useMode();
  const { t } = useTranslations(mode);
  const { registerPath } = useModePath();
  const navigate = useNavigate();

  useEffect(() => {
    const checkShouldShow = () => {
      const lastShown = localStorage.getItem(config.interestPopup.storageKey);
      
      if (!lastShown) {
        setTimeout(() => setIsOpen(true), 2000);
        return;
      }

      const lastShownDate = new Date(lastShown);
      const now = new Date();
      const daysSinceLastShown = (now.getTime() - lastShownDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSinceLastShown >= config.interestPopup.showIntervalDays) {
        setTimeout(() => setIsOpen(true), 2000);
      }
    };

    checkShouldShow();
  }, []);

  const handleClose = () => {
    localStorage.setItem(config.interestPopup.storageKey, new Date().toISOString());
    setIsOpen(false);
  };

  const handleRegisterInterest = () => {
    handleClose();
    navigate(registerPath);
  };

  const content = {
    headline: {
      'hi-shuddh': 'शीघ्र प्रारम्भ — अद्यतन प्राप्त करें',
      'hi-mixed': 'Launching soon — updates पाएँ',
      'hinglish': 'Launching soon — updates paayein',
      'en': 'Launching soon — get updates',
    },
    description: {
      'hi-shuddh': 'नए वीडियो, टिप्पणियाँ, और पाठ्यक्रमों की सूचना प्राप्त करने के लिए रुचि दर्ज करें।',
      'hi-mixed': 'नए videos, notes, और courses की notification पाने के लिए interest register करें।',
      'hinglish': 'Naye videos, notes, aur courses ki notification paane ke liye interest register karein.',
      'en': 'Register your interest to get notified about new videos, notes, and courses.',
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Bell className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            {content.headline[mode]}
          </DialogTitle>
          <DialogDescription className="text-center">
            {content.description[mode]}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            size="lg" 
            className="gap-2 w-full"
            onClick={handleRegisterInterest}
          >
            <Sparkles className="h-5 w-5" />
            {t('registerInterest')}
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full"
            onClick={handleClose}
          >
            {t('maybeLater')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
