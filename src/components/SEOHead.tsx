import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from '@/config';
import { LanguageMode, MODES } from '@/lib/modes';

interface SEOProps {
  title?: string;
  description?: string;
  mode?: LanguageMode;
}

// Route-based SEO metadata
const routeMeta: Record<string, Record<LanguageMode, { title: string; description: string }>> = {
  '': {
    'hi-shuddh': {
      title: 'एक बटा शून्य — गणित को सरल बनाना',
      description: 'हिन्दी में गणित सीखें। वीडियो, टिप्पणियाँ, और अभ्यास प्रश्नों के साथ।',
    },
    'hi-mixed': {
      title: 'Ek Bata Shoonya — गणित को simple बनाना',
      description: 'Hindi में maths सीखें। Videos, notes, और practice questions के साथ।',
    },
    'hinglish': {
      title: 'Ek Bata Shoonya — Maths ko simple banana',
      description: 'Hindi mein maths seekhein. Videos, notes, aur practice questions ke saath.',
    },
    'en': {
      title: 'Ek Bata Shoonya — Making Mathematics Simple',
      description: 'Learn mathematics in Hindi. With videos, notes, and practice questions.',
    },
  },
  'courses': {
    'hi-shuddh': { title: 'पाठ्यक्रम', description: 'सभी उपलब्ध गणित पाठ्यक्रम देखें।' },
    'hi-mixed': { title: 'Courses', description: 'सभी available maths courses देखें।' },
    'hinglish': { title: 'Courses', description: 'Sabhi available maths courses dekhein.' },
    'en': { title: 'Courses', description: 'Browse all available mathematics courses.' },
  },
  'notes': {
    'hi-shuddh': { title: 'टिप्पणियाँ', description: 'पीडीएफ़ टिप्पणियाँ और चीटशीट डाउनलोड करें।' },
    'hi-mixed': { title: 'Notes', description: 'PDF notes और cheatsheets download करें।' },
    'hinglish': { title: 'Notes', description: 'PDF notes aur cheatsheets download karein.' },
    'en': { title: 'Notes', description: 'Download PDF notes and cheatsheets.' },
  },
  'blog': {
    'hi-shuddh': { title: 'अद्यतन', description: 'नवीनतम समाचार और अद्यतन पढ़ें।' },
    'hi-mixed': { title: 'Blog', description: 'Latest news और updates पढ़ें।' },
    'hinglish': { title: 'Blog', description: 'Latest news aur updates padhein.' },
    'en': { title: 'Blog', description: 'Read the latest news and updates.' },
  },
  'about': {
    'hi-shuddh': { title: 'परिचय', description: 'एक बटा शून्य के बारे में जानें।' },
    'hi-mixed': { title: 'About', description: 'Ek Bata Shoonya के बारे में जानें।' },
    'hinglish': { title: 'About', description: 'Ek Bata Shoonya ke baare mein jaanein.' },
    'en': { title: 'About', description: 'Learn about Ek Bata Shoonya.' },
  },
  'privacy': {
    'hi-shuddh': { title: 'गोपनीयता नीति', description: 'हमारी गोपनीयता नीति पढ़ें।' },
    'hi-mixed': { title: 'Privacy Policy', description: 'हमारी privacy policy पढ़ें।' },
    'hinglish': { title: 'Privacy Policy', description: 'Hamari privacy policy padhein.' },
    'en': { title: 'Privacy Policy', description: 'Read our privacy policy.' },
  },
  'terms': {
    'hi-shuddh': { title: 'उपयोग की शर्तें', description: 'उपयोग की शर्तें पढ़ें।' },
    'hi-mixed': { title: 'Terms of Use', description: 'Terms of use पढ़ें।' },
    'hinglish': { title: 'Terms of Use', description: 'Terms of use padhein.' },
    'en': { title: 'Terms of Use', description: 'Read our terms of use.' },
  },
  'contact': {
    'hi-shuddh': { title: 'सम्पर्क', description: 'हमसे सम्पर्क करें।' },
    'hi-mixed': { title: 'Contact', description: 'हमसे contact करें।' },
    'hinglish': { title: 'Contact', description: 'Humse contact karein.' },
    'en': { title: 'Contact', description: 'Get in touch with us.' },
  },
};

export function useSEO({ title, description, mode }: SEOProps = {}) {
  const location = useLocation();

  useEffect(() => {
    // Extract mode and route from path
    const pathParts = location.pathname.split('/').filter(Boolean);
    const pathMode = (pathParts[0] && pathParts[0] in MODES ? pathParts[0] : 'hi-mixed') as LanguageMode;
    const currentMode = mode || pathMode;
    const route = pathParts.slice(1).join('/') || '';
    const baseRoute = route.split('/')[0] || '';

    // Get meta for this route
    const meta = routeMeta[baseRoute]?.[currentMode] || routeMeta['']?.[currentMode];
    
    const pageTitle = title || meta?.title || config.siteName;
    const pageDescription = description || meta?.description || '';

    // Update document title
    document.title = `${pageTitle} | ${config.siteName}`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDescription);

    // Update OG tags
    updateMetaTag('og:title', pageTitle);
    updateMetaTag('og:description', pageDescription);
    updateMetaTag('og:url', `${config.siteUrl}/#${location.pathname}`);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:site_name', config.siteName);

    // Update Twitter tags
    updateMetaTag('twitter:title', pageTitle, 'name');
    updateMetaTag('twitter:description', pageDescription, 'name');

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${config.siteUrl}/#${location.pathname}`);

  }, [location.pathname, title, description, mode]);
}

function updateMetaTag(property: string, content: string, attr: 'property' | 'name' = 'property') {
  let tag = document.querySelector(`meta[${attr}="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// Component version for use in pages
export function SEOHead(props: SEOProps) {
  useSEO(props);
  return null;
}
