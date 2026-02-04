// Analytics utilities using Plausible
import { config } from '@/config';

// Check if Plausible is available
function isPlausibleAvailable(): boolean {
  return config.plausible.enabled && typeof window !== 'undefined' && 'plausible' in window;
}

// Declare plausible on window
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

// Track a custom event
export function trackEvent(eventName: string, props?: Record<string, string | number | boolean>) {
  if (!isPlausibleAvailable()) {
    // Log in dev for debugging
    if (import.meta.env.DEV) {
      console.log('[Analytics]', eventName, props);
    }
    return;
  }
  
  window.plausible?.(eventName, props ? { props } : undefined);
}

// Predefined events
export const analytics = {
  registerInterestClick: () => trackEvent('register_interest_click'),
  modeChange: (mode: string) => trackEvent('mode_change', { mode }),
  openNotesPdf: (pdfName: string) => trackEvent('open_notes_pdf', { pdf: pdfName }),
  youtubeClick: () => trackEvent('youtube_click'),
};
