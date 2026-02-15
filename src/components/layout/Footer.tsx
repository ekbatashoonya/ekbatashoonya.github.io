import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { analytics } from '@/lib/analytics';
import { config } from '@/config';
import { MODE_ORDER, MODES } from '@/lib/modes';
import { getVersionLabel } from '@/lib/version';
import { Github, Mail, Youtube, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import footerLogo from '@/assets/footer-logo.png';

export function Footer() {
  const { mode, switchMode } = useMode();
  const { homePath, aboutPath, getPath } = useModePath();
  const { t } = useTranslations(mode);

  const handleModeSwitch = (newMode: typeof mode) => {
    analytics.modeChange(newMode);
    switchMode(newMode);
  };

  const handleRegisterInterest = () => {
    analytics.registerInterestClick();
    if (config.googleFormUrl) {
      window.open(config.googleFormUrl, '_blank');
    }
  };

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link to={homePath} className="flex items-center gap-2 font-semibold text-lg text-foreground">
              <img src={footerLogo} alt="एक बटा शून्य" className="h-10 w-10" />
              {mode === 'en' || mode === 'hinglish' ? 'Ek Bata Shoonya' : 'एक बटा शून्य'}
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {mode === 'en'
                ? 'Making mathematics simple and accessible, in Hindi.'
                : mode === 'hinglish' 
                ? 'Maths ko simple aur accessible banana, Hindi mein.' 
                : mode === 'hi-shuddh'
                ? 'गणित को सरल और सुगम बनाना, हिन्दी में।'
                : 'गणित को simple और accessible बनाना, Hindi में।'}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 mt-2"
              onClick={handleRegisterInterest}
            >
              <Sparkles className="h-4 w-4" />
              {t('registerInterest')}
            </Button>
          </div>

          {/* Mode Quick Links */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">
              {mode === 'en' ? 'Language Modes' : mode === 'hinglish' ? 'Language Modes' : mode === 'hi-shuddh' ? 'भाषा विकल्प' : 'Language Modes'}
            </h4>
            <div className="flex flex-col gap-2">
              {MODE_ORDER.map((modeId) => (
                <button
                  key={modeId}
                  onClick={() => handleModeSwitch(modeId)}
                  className={`text-sm text-left transition-colors ${
                    modeId === mode 
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {MODES[modeId].label}
                </button>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">
              {mode === 'en' ? 'Legal' : mode === 'hinglish' ? 'Legal' : mode === 'hi-shuddh' ? 'कानूनी' : 'Legal'}
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to={getPath('privacy')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                to={getPath('terms')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('terms')}
              </Link>
              <Link
                to={getPath('about')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('about')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">{t('contact')}</h4>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${config.contactEmail}`}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
              <a
                href={config.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>{t('suggestImprovement')}</span>
              </a>
              {config.youtubeChannelUrl && (
                <a
                  href={config.youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright and version (version flows from Lovable dev → staging → main → deploy) */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <p className="text-sm text-muted-foreground">
              {t('copyright')} {new Date().getFullYear()}
            </p>
            <p className="text-xs text-muted-foreground/80 font-mono" title="Lovable dev → staging → main">
              {getVersionLabel()}
            </p>
          </div>
          <Link 
            to={aboutPath} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('about')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
