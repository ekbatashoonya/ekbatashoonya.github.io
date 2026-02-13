import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';
import { LanguageMode, MODE_ORDER, MODES } from '@/lib/modes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface NotAvailablePageProps {
  availableModes?: LanguageMode[];
}

export function NotAvailablePage({ availableModes = [] }: NotAvailablePageProps) {
  const { mode, switchMode } = useMode();
  const { t } = useTranslations(mode);

  const otherModes = availableModes.length > 0 
    ? availableModes.filter((m) => m !== mode)
    : MODE_ORDER.filter((m) => m !== mode);

  return (
    <div className="container px-4 md:px-6 py-16 md:py-24">
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="text-xl">{t('notAvailable')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            {mode === 'en'
              ? 'This content is not available in this language mode.'
              : mode === 'hinglish'
              ? 'Yeh content is language mode mein available nahi hai.'
              : mode === 'hi-shuddh'
              ? 'यह सामग्री इस भाषा में उपलब्ध नहीं है।'
              : 'यह content इस language mode में available नहीं है।'}
          </p>

          {otherModes.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{t('switchToAvailable')}:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {otherModes.map((m) => (
                  <Button 
                    key={m} 
                    variant="outline" 
                    onClick={() => switchMode(m)}
                  >
                    {MODES[m].label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
