import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { ModeSelector } from './ModeSelector';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { mode } = useMode();
  const { homePath, coursesPath, notesPath, blogPath, aboutPath } = useModePath();
  const { t } = useTranslations(mode);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('home'), path: homePath },
    { label: t('courses'), path: coursesPath },
    { label: t('notes'), path: notesPath },
    { label: t('blog'), path: blogPath },
    { label: t('about'), path: aboutPath },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link 
          to={homePath} 
          className="flex items-center gap-2 font-semibold text-lg text-foreground hover:text-primary transition-colors"
        >
          <span className="hidden sm:inline">एक बटा शून्य</span>
          <span className="sm:hidden">१/०</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mode Selector + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <ModeSelector />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
