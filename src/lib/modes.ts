// Language/Register Mode System for Ek Bata Shoonya

export type LanguageMode = 'hi-shuddh' | 'hi-mixed' | 'hinglish' | 'en';

export interface ModeConfig {
  id: LanguageMode;
  label: string;
  shortLabel: string;
  description: string;
  script: 'devanagari' | 'roman' | 'mixed';
}

export const MODES: Record<LanguageMode, ModeConfig> = {
  'hi-shuddh': {
    id: 'hi-shuddh',
    label: 'हिन्दी (शुद्ध)',
    shortLabel: 'शुद्ध',
    description: 'Pure Hindi with Devanagari script',
    script: 'devanagari',
  },
  'hi-mixed': {
    id: 'hi-mixed',
    label: 'हिन्दी + English',
    shortLabel: 'मिश्रित',
    description: 'Hindi with English technical terms',
    script: 'mixed',
  },
  'hinglish': {
    id: 'hinglish',
    label: 'Hinglish (Roman)',
    shortLabel: 'Roman',
    description: 'Hindi in Roman script',
    script: 'roman',
  },
  'en': {
    id: 'en',
    label: 'English',
    shortLabel: 'EN',
    description: 'Full English',
    script: 'roman',
  },
};

export const MODE_ORDER: LanguageMode[] = ['hi-shuddh', 'hi-mixed', 'hinglish', 'en'];

export const DEFAULT_MODE: LanguageMode = 'hi-mixed';

export const STORAGE_KEY = 'ek-bata-shoonya-mode';

// Get saved mode from localStorage
export function getSavedMode(): LanguageMode | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved in MODES) {
    return saved as LanguageMode;
  }
  return null;
}

// Save mode to localStorage
export function saveMode(mode: LanguageMode): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, mode);
}

// Extract mode from URL path
export function getModeFromPath(path: string): LanguageMode | null {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && firstSegment in MODES) {
    return firstSegment as LanguageMode;
  }
  return null;
}

// Build a path with mode prefix
export function buildModePath(mode: LanguageMode, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${mode}/${cleanPath ? cleanPath + '/' : ''}`;
}

// Switch mode in a path (replace mode segment)
export function switchModeInPath(currentPath: string, newMode: LanguageMode): string {
  const segments = currentPath.split('/').filter(Boolean);
  const currentMode = getModeFromPath(currentPath);
  
  if (currentMode) {
    segments[0] = newMode;
  } else {
    segments.unshift(newMode);
  }
  
  return '/' + segments.join('/') + '/';
}

// Get path without mode prefix
export function getPathWithoutMode(path: string): string {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && firstSegment in MODES) {
    return '/' + segments.slice(1).join('/');
  }
  
  return path;
}
