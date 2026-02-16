import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from '@/config';
import { LanguageMode, MODES } from '@/lib/modes';
import { courses } from '@/content/data';

interface SEOProps {
  title?: string;
  description?: string;
  mode?: LanguageMode;
}

// Default indexable mode — only hi-mixed pages get indexed
const INDEXABLE_MODE: LanguageMode = 'hi-mixed';

// Routes that are too thin to index (even in hi-mixed)
const NOINDEX_ROUTES = new Set(['notes', 'contact', 'register']);

// Route-based SEO metadata (used for both runtime and static generation)
export const routeMeta: Record<string, Record<LanguageMode, { title: string; description: string }>> = {
  '': {
    'hi-shuddh': {
      title: 'एक बटा शून्य — हिन्दी में गणित की नींव',
      description: 'शून्य से अनंत तक — गणित की सुदृढ़ नींव, तर्क और अवधारणात्मक स्पष्टता। वीडियो व्याख्यान और संरचित टिप्पणियों के साथ। पंजीकरण करें!',
    },
    'hi-mixed': {
      title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi',
      description: 'शून्य से अनंत तक — mathematics की strong foundations, conceptual clarity, video lectures और structured notes। Hindi में free maths education platform।',
    },
    'hinglish': {
      title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi',
      description: 'Shoonya se anant tak — mathematics ki strong foundations aur conceptual clarity. Video lectures aur structured notes ke saath. Register karein!',
    },
    'en': {
      title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi',
      description: 'From zero to infinity — building strong foundations in mathematics through logic and conceptual clarity. With video lectures and structured notes. Register now!',
    },
  },
  'courses': {
    'hi-shuddh': { title: 'पाठ्यक्रम', description: 'सभी उपलब्ध गणित पाठ्यक्रम देखें।' },
    'hi-mixed': { title: 'Courses', description: 'सभी available mathematics courses देखें — Mathematical Logic से शुरू करें। Hindi में free video lectures और structured notes के साथ step-by-step learning।' },
    'hinglish': { title: 'Courses', description: 'Sabhi available maths courses dekhein.' },
    'en': { title: 'Courses', description: 'Browse all available mathematics courses.' },
  },
  'courses/mathematical-logic': {
    'hi-shuddh': { title: 'गणितीय तर्कशास्त्र', description: 'तर्कशास्त्र के मूलभूत सिद्धांतों का अध्ययन — कथन, सत्य-मूल्य, और तार्किक संयोजक।' },
    'hi-mixed': { title: 'Mathematical Logic', description: 'Mathematical Logic course — statements, truth values, और logical connectives को Hindi में समझें। Beginner-friendly lectures और structured notes के साथ।' },
    'hinglish': { title: 'Mathematical Logic', description: 'Logic ke fundamental principles ka study — statements, truth values, aur logical connectives.' },
    'en': { title: 'Mathematical Logic', description: 'Study the fundamental principles of logic — statements, truth values, and logical connectives.' },
  },
  'courses/mathematical-logic/logic-lecture-0': {
    'hi-shuddh': { title: 'व्याख्यान ० — आधारभूत अवधारणाएँ', description: 'गणितीय तर्कशास्त्र की आधारभूत अवधारणाएँ — कथन, सत्य-मूल्य, और तार्किक आधार।' },
    'hi-mixed': { title: 'Lecture 0 — Basic Concepts', description: 'Mathematical Logic की basic concepts — statements, truth values, propositions, और logical reasoning की शुरुआत। Hindi में free lecture notes।' },
    'hinglish': { title: 'Lecture 0 — Basic Concepts', description: 'Mathematical Logic ki basic concepts — statements, truth values, aur logical reasoning ki shuruat.' },
    'en': { title: 'Lecture 0 — Basic Concepts', description: 'Introduction to basic concepts of Mathematical Logic — statements, truth values, and logical reasoning.' },
  },
  'notes': {
    'hi-shuddh': { title: 'टिप्पणियाँ', description: 'पीडीएफ़ टिप्पणियाँ और चीटशीट डाउनलोड करें।' },
    'hi-mixed': { title: 'Notes', description: 'PDF notes, cheatsheets, और LaTeX files download करें — Mathematical Logic और अन्य courses के लिए structured study material।' },
    'hinglish': { title: 'Notes', description: 'PDF notes aur cheatsheets download karein.' },
    'en': { title: 'Notes', description: 'Download PDF notes and cheatsheets.' },
  },
  'blog': {
    'hi-shuddh': { title: 'अद्यतन', description: 'नवीनतम समाचार और अद्यतन पढ़ें।' },
    'hi-mixed': { title: 'Blog', description: 'Ek Bata Shoonya के latest updates, announcements, और articles पढ़ें। New courses, videos, और features के बारे में जानें।' },
    'hinglish': { title: 'Blog', description: 'Latest news aur updates padhein.' },
    'en': { title: 'Blog', description: 'Read the latest news and updates.' },
  },
  'blog/welcome': {
    'hi-shuddh': { title: 'एक बटा शून्य में आपका स्वागत है!', description: 'हम एक बटा शून्य का शुभारम्भ करते हुए अत्यंत प्रसन्न हैं — हिन्दी में गणित शिक्षा का एक नया मंच।' },
    'hi-mixed': { title: 'Welcome to Ek Bata Shoonya!', description: 'Ek Bata Shoonya launch हो रहा है — Hindi में mathematics education का एक free platform। Video lectures, notes, और courses जल्द आ रहे हैं।' },
    'hinglish': { title: 'Welcome to Ek Bata Shoonya!', description: 'Hum Ek Bata Shoonya ka launch karte hue bahut excited hain — Hindi mein maths education ka ek naya platform.' },
    'en': { title: 'Welcome to Ek Bata Shoonya!', description: 'We are excited to launch Ek Bata Shoonya — a free mathematics education platform in Hindi with video lectures and notes.' },
  },
  'about': {
    'hi-shuddh': { title: 'परिचय', description: 'एक बटा शून्य के बारे में जानें — हमारा उद्देश्य, दृष्टि, और टीम।' },
    'hi-mixed': { title: 'About', description: 'Ek Bata Shoonya के बारे में जानें — हमारा mission mathematics को Hindi में accessible बनाना है। Community-driven, free, और open-source।' },
    'hinglish': { title: 'About', description: 'Ek Bata Shoonya ke baare mein jaanein — hamara mission maths ko Hindi mein accessible banana hai.' },
    'en': { title: 'About', description: 'Learn about Ek Bata Shoonya — our mission is to make mathematics accessible in Hindi. Community-driven, free, and open-source.' },
  },
  'privacy': {
    'hi-shuddh': { title: 'गोपनीयता नीति', description: 'एक बटा शून्य की गोपनीयता नीति — हम आपकी जानकारी कैसे संग्रहित और उपयोग करते हैं।' },
    'hi-mixed': { title: 'Privacy Policy', description: 'Ek Bata Shoonya की privacy policy — हम क्या information collect करते हैं, कैसे use करते हैं, और आपके rights क्या हैं। GDPR compliant।' },
    'hinglish': { title: 'Privacy Policy', description: 'Ek Bata Shoonya ki privacy policy — hum kya information collect karte hain aur kaise use karte hain.' },
    'en': { title: 'Privacy Policy', description: 'Ek Bata Shoonya privacy policy — what information we collect, how we use it, and your data rights. GDPR compliant.' },
  },
  'terms': {
    'hi-shuddh': { title: 'उपयोग की शर्तें', description: 'एक बटा शून्य की उपयोग की शर्तें — सामग्री का उपयोग, अस्वीकरण, और दायित्व।' },
    'hi-mixed': { title: 'Terms of Use', description: 'Ek Bata Shoonya की terms of use — content का उपयोग, user conduct, disclaimer, और liability की जानकारी। Educational content free है।' },
    'hinglish': { title: 'Terms of Use', description: 'Ek Bata Shoonya ki terms of use — content ka use, user conduct, aur disclaimer ki jaankari.' },
    'en': { title: 'Terms of Use', description: 'Ek Bata Shoonya terms of use — content usage, user conduct, disclaimers, and liability. Educational content is free.' },
  },
  'contact': {
    'hi-shuddh': { title: 'सम्पर्क', description: 'हमसे सम्पर्क करें — ईमेल, सोशल मीडिया, और अन्य माध्यम।' },
    'hi-mixed': { title: 'Contact', description: 'Ek Bata Shoonya से contact करें — email, GitHub, YouTube, Twitter, और Instagram। Questions और feedback welcome हैं।' },
    'hinglish': { title: 'Contact', description: 'Ek Bata Shoonya se contact karein — email, GitHub, YouTube, Twitter, aur Instagram.' },
    'en': { title: 'Contact', description: 'Get in touch with Ek Bata Shoonya — email, GitHub, YouTube, Twitter, and Instagram. Questions and feedback welcome.' },
  },
  'register': {
    'hi-shuddh': { title: 'रुचि दर्ज करें', description: 'नई सामग्री की सूचना प्राप्त करने के लिए रुचि दर्ज करें।' },
    'hi-mixed': { title: 'Register Interest', description: 'Ek Bata Shoonya के नए videos, notes, और courses की notification पाने के लिए interest register करें। Free mathematics education।' },
    'hinglish': { title: 'Register Interest', description: 'Naye content ki notification paane ke liye register karein.' },
    'en': { title: 'Register Interest', description: 'Register your interest to get notified about new videos, notes, and courses from Ek Bata Shoonya.' },
  },
};

/**
 * Determine whether a page should be noindexed.
 * Only hi-mixed mode content pages are indexable.
 */
export function shouldNoindex(mode: LanguageMode, baseRoute: string): boolean {
  // Non-default modes are always noindexed
  if (mode !== INDEXABLE_MODE) return true;
  // Thin/shell routes are noindexed even in default mode
  if (NOINDEX_ROUTES.has(baseRoute)) return true;
  return false;
}

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
    const meta = routeMeta[route]?.[currentMode] || routeMeta[baseRoute]?.[currentMode] || routeMeta['']?.[currentMode];
    
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

    // Robots: noindex for non-indexable pages
    const noindex = shouldNoindex(currentMode, baseRoute);
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsTag) {
        robotsTag = document.createElement('meta');
        robotsTag.setAttribute('name', 'robots');
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute('content', 'noindex, follow');
    } else {
      // Remove noindex if present (for SPA navigation)
      if (robotsTag) robotsTag.remove();
    }

    // Update OG tags
    updateMetaTag('og:title', pageTitle);
    updateMetaTag('og:description', pageDescription);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:site_name', config.siteName);

    // Update Twitter tags
    updateMetaTag('twitter:title', pageTitle, 'name');
    updateMetaTag('twitter:description', pageDescription, 'name');

    // Update canonical (per language variant URL, with trailing slash)
    const cleanPath = location.pathname.replace(/\/+$/, '');
    const canonicalUrl = `${config.siteUrl}${cleanPath}/`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update OG URL to match canonical
    updateMetaTag('og:url', canonicalUrl);

    // Update <html lang=""> for current language variant (accessibility & SEO)
    const htmlLang = currentMode === 'en' ? 'en' : 'hi';
    document.documentElement.lang = htmlLang;

    // Update og:locale for social previews per variant
    const ogLocale = currentMode === 'en' ? 'en_US' : 'hi_IN';
    updateMetaTag('og:locale', ogLocale);

    // Remove any stale hreflang tags (cleanup from previous implementation)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // JSON-LD structured data (only for indexable pages)
    if (!noindex) {
      updateJsonLd(currentMode, baseRoute, route);
    } else {
      // Remove JSON-LD from noindexed pages
      document.querySelectorAll('script[data-jsonld="ebs"]').forEach(el => el.remove());
    }

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

// JSON-LD structured data management
function updateJsonLd(mode: LanguageMode, baseRoute: string, fullRoute: string) {
  // Remove existing JSON-LD
  document.querySelectorAll('script[data-jsonld="ebs"]').forEach(el => el.remove());

  const schemas: object[] = [];

  // Organization schema (always present on indexable pages)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Ek Bata Shoonya',
    alternateName: 'एक बटा शून्य',
    url: config.siteUrl,
    logo: `${config.siteUrl}/favicon-180.png`,
    description: 'Free mathematics education platform in Hindi — from zero to infinity.',
    sameAs: [
      config.youtubeChannelUrl,
      config.twitterUrl,
      config.instagramUrl,
      config.githubUrl,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: config.contactEmail,
      contactType: 'customer support',
    },
  });

  // WebSite schema with search
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ek Bata Shoonya',
    url: config.siteUrl,
    inLanguage: mode === 'en' ? 'en' : 'hi',
  });

  // Course schemas on courses pages
  if (baseRoute === '' || baseRoute === 'courses') {
    courses.forEach(course => {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title[mode],
        description: course.description[mode],
        url: `${config.siteUrl}/${mode}/courses/${course.slug}/`,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Ek Bata Shoonya',
          url: config.siteUrl,
        },
        isAccessibleForFree: true,
        inLanguage: mode === 'en' ? 'en' : 'hi',
        teaches: 'Mathematics',
      });
    });
  }

  // Inject all schemas
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld', 'ebs');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// Component version for use in pages
export function SEOHead(props: SEOProps) {
  useSEO(props);
  return null;
}
