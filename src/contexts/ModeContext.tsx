import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LanguageMode, 
  DEFAULT_MODE, 
  getSavedMode, 
  saveMode, 
  getModeFromPath,
  switchModeInPath,
  MODES,
  ModeConfig
} from '@/lib/modes';

interface ModeContextValue {
  mode: LanguageMode;
  modeConfig: ModeConfig;
  setMode: (mode: LanguageMode) => void;
  switchMode: (mode: LanguageMode) => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get mode from URL or fallback to saved/default
  const modeFromPath = getModeFromPath(location.pathname);
  const [mode, setModeState] = useState<LanguageMode>(
    modeFromPath || getSavedMode() || DEFAULT_MODE
  );

  // Sync mode when URL changes
  useEffect(() => {
    const pathMode = getModeFromPath(location.pathname);
    if (pathMode && pathMode !== mode) {
      setModeState(pathMode);
      saveMode(pathMode);
    }
  }, [location.pathname, mode]);

  // Set mode (updates state and localStorage, does not navigate)
  const setMode = (newMode: LanguageMode) => {
    setModeState(newMode);
    saveMode(newMode);
  };

  // Switch mode (updates state, localStorage, AND navigates to parallel page)
  const switchMode = (newMode: LanguageMode) => {
    if (newMode === mode) return;
    
    setModeState(newMode);
    saveMode(newMode);
    
    const newPath = switchModeInPath(location.pathname, newMode);
    navigate(newPath);
  };

  const value: ModeContextValue = {
    mode,
    modeConfig: MODES[mode],
    setMode,
    switchMode,
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
