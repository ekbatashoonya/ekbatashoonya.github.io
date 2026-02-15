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
      title: 'एक बटा शून्य | गणित की नींव',
      description: 'शून्य से अनंत तक — एक बहुभाषी मंच जहाँ गणित की सुदृढ़ नींव, तर्क और अवधारणात्मक स्पष्टता पर कार्य किया जाएगा। वीडियो व्याख्यान और संरचित टिप्पणियों के साथ। आरम्भ से पूर्व पंजीकरण करें।',
    },
    'hi-mixed': {
      title: 'Ek Bata Shoonya | Foundations of Mathematics',
      description: 'शून्य से अनंत तक -- एक multilingual platform जहाँ mathematics की strong foundations, तर्क और conceptual clarity पर काम किया जाएगा। Video lectures और structured notes के साथ। Launch से पहले register करें।',
    },
    'hinglish': {
      title: 'Ek Bata Shoonya | Foundations of Mathematics',
      description: 'Shoonya se anant tak -- ek multilingual platform jahaan mathematics ki strong foundations, tark aur conceptual clarity par kaam kiya jaayega. Video lectures aur structured notes ke saath. Launch se pehle register karein.',
    },
    'en': {
      title: 'Ek Bata Shoonya | Foundations of Mathematics',
      description: 'From zero to infinity — a multilingual platform building strong foundations in mathematics through logic and conceptual clarity. With video lectures and structured notes. Register before launch.',
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

    // Update canonical (per language variant URL)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${config.siteUrl}/#${location.pathname}`);

    // Update <html lang=""> for current language variant (accessibility & SEO)
    const htmlLang = currentMode === 'en' ? 'en' : 'hi';
    document.documentElement.lang = htmlLang;

    // Update og:locale for social previews per variant
    const ogLocale = currentMode === 'en' ? 'en_US' : 'hi_IN';
    updateMetaTag('og:locale', ogLocale);

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
