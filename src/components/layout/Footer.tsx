import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { MODE_ORDER, MODES } from '@/lib/modes';
import { Github, Mail } from 'lucide-react';

export function Footer() {
  const { mode, switchMode } = useMode();
  const { homePath, aboutPath } = useModePath();
  const { t } = useTranslations(mode);

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link to={homePath} className="font-semibold text-lg text-foreground">
              एक बटा शून्य
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {mode === 'hinglish' 
                ? 'Maths ko simple aur accessible banana, Hindi mein.' 
                : mode === 'hi-shuddh'
                ? 'गणित को सरल और सुगम बनाना, हिन्दी में।'
                : 'गणित को simple और accessible बनाना, Hindi में।'}
            </p>
          </div>

          {/* Mode Quick Links */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">
              {mode === 'hinglish' ? 'Language Modes' : mode === 'hi-shuddh' ? 'भाषा विकल्प' : 'Language Modes'}
            </h4>
            <div className="flex flex-col gap-2">
              {MODE_ORDER.map((modeId) => (
                <button
                  key={modeId}
                  onClick={() => switchMode(modeId)}
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

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">{t('contact')}</h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contact@example.com"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>{t('suggestImprovement')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t('copyright')} {new Date().getFullYear()}
          </p>
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
