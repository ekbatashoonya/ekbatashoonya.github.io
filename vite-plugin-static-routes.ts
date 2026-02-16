/**
 * Vite Plugin: Static Route HTML Generator
 * 
 * Generates individual index.html files for each SPA route at build time.
 * This ensures GitHub Pages returns HTTP 200 (not 404) for every route,
 * and injects route-specific meta tags so crawlers see correct titles,
 * descriptions, and canonical URLs without executing JavaScript.
 */

import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

interface RouteMeta {
  title: string;
  description: string;
  lang: string;
  ogLocale: string;
}

type LanguageMode = 'hi-shuddh' | 'hi-mixed' | 'hinglish' | 'en';

const SITE_URL = 'https://ekbatashoonya.com';
const SITE_NAME = 'Ek Bata Shoonya';

// Route metadata for all pages × all modes
const routeMeta: Record<string, Record<LanguageMode, RouteMeta>> = {
  '': {
    'hi-shuddh': { title: 'एक बटा शून्य — हिन्दी में गणित की नींव', description: 'शून्य से अनंत तक — गणित की सुदृढ़ नींव, तर्क और अवधारणात्मक स्पष्टता। वीडियो व्याख्यान और संरचित टिप्पणियों के साथ।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi', description: 'शून्य से अनंत तक — mathematics की strong foundations और conceptual clarity। Video lectures और structured notes के साथ।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi', description: 'Shoonya se anant tak — mathematics ki strong foundations aur conceptual clarity. Video lectures aur structured notes ke saath.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi', description: 'From zero to infinity — building strong foundations in mathematics through logic and conceptual clarity. With video lectures and structured notes.', lang: 'en', ogLocale: 'en_US' },
  },
  'courses': {
    'hi-shuddh': { title: 'पाठ्यक्रम — एक बटा शून्य', description: 'सभी उपलब्ध गणित पाठ्यक्रम देखें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Courses — Ek Bata Shoonya', description: 'सभी available maths courses देखें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Courses — Ek Bata Shoonya', description: 'Sabhi available maths courses dekhein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Courses — Ek Bata Shoonya', description: 'Browse all available mathematics courses.', lang: 'en', ogLocale: 'en_US' },
  },
  'courses/mathematical-logic': {
    'hi-shuddh': { title: 'गणितीय तर्कशास्त्र — एक बटा शून्य', description: 'तर्कशास्त्र के मूलभूत सिद्धांतों का अध्ययन।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Mathematical Logic — Ek Bata Shoonya', description: 'Logic के fundamental principles का study।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Mathematical Logic — Ek Bata Shoonya', description: 'Logic ke fundamental principles ka study.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Mathematical Logic — Ek Bata Shoonya', description: 'Study of fundamental principles of logic.', lang: 'en', ogLocale: 'en_US' },
  },
  'courses/mathematical-logic/logic-lecture-0': {
    'hi-shuddh': { title: 'व्याख्यान ० — आधारभूत अवधारणाएँ — एक बटा शून्य', description: 'गणितीय तर्कशास्त्र की आधारभूत अवधारणाएँ।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Lecture 0 — Basic Concepts — Ek Bata Shoonya', description: 'Mathematical Logic की basic concepts।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Lecture 0 — Basic Concepts — Ek Bata Shoonya', description: 'Mathematical Logic ki basic concepts.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Lecture 0 — Basic Concepts — Ek Bata Shoonya', description: 'Basic concepts of Mathematical Logic.', lang: 'en', ogLocale: 'en_US' },
  },
  'notes': {
    'hi-shuddh': { title: 'टिप्पणियाँ — एक बटा शून्य', description: 'पीडीएफ़ टिप्पणियाँ और चीटशीट डाउनलोड करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Notes — Ek Bata Shoonya', description: 'PDF notes और cheatsheets download करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Notes — Ek Bata Shoonya', description: 'PDF notes aur cheatsheets download karein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Notes — Ek Bata Shoonya', description: 'Download PDF notes and cheatsheets.', lang: 'en', ogLocale: 'en_US' },
  },
  'blog': {
    'hi-shuddh': { title: 'अद्यतन — एक बटा शून्य', description: 'नवीनतम समाचार और अद्यतन पढ़ें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Blog — Ek Bata Shoonya', description: 'Latest news और updates पढ़ें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Blog — Ek Bata Shoonya', description: 'Latest news aur updates padhein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Blog — Ek Bata Shoonya', description: 'Read the latest news and updates.', lang: 'en', ogLocale: 'en_US' },
  },
  'blog/welcome': {
    'hi-shuddh': { title: 'एक बटा शून्य में आपका स्वागत है! — एक बटा शून्य', description: 'हम एक बटा शून्य का शुभारम्भ करते हुए अत्यंत प्रसन्न हैं।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Welcome to Ek Bata Shoonya! — Ek Bata Shoonya', description: 'हम Ek Bata Shoonya का launch करते हुए बहुत excited हैं।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Welcome to Ek Bata Shoonya! — Ek Bata Shoonya', description: 'Hum Ek Bata Shoonya ka launch karte hue bahut excited hain.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Welcome to Ek Bata Shoonya! — Ek Bata Shoonya', description: 'We are excited to launch Ek Bata Shoonya.', lang: 'en', ogLocale: 'en_US' },
  },
  'about': {
    'hi-shuddh': { title: 'परिचय — एक बटा शून्य', description: 'एक बटा शून्य के बारे में जानें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'About — Ek Bata Shoonya', description: 'Ek Bata Shoonya के बारे में जानें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'About — Ek Bata Shoonya', description: 'Ek Bata Shoonya ke baare mein jaanein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'About — Ek Bata Shoonya', description: 'Learn about Ek Bata Shoonya.', lang: 'en', ogLocale: 'en_US' },
  },
  'privacy': {
    'hi-shuddh': { title: 'गोपनीयता नीति — एक बटा शून्य', description: 'हमारी गोपनीयता नीति पढ़ें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Privacy Policy — Ek Bata Shoonya', description: 'हमारी privacy policy पढ़ें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Privacy Policy — Ek Bata Shoonya', description: 'Hamari privacy policy padhein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Privacy Policy — Ek Bata Shoonya', description: 'Read our privacy policy.', lang: 'en', ogLocale: 'en_US' },
  },
  'terms': {
    'hi-shuddh': { title: 'उपयोग की शर्तें — एक बटा शून्य', description: 'उपयोग की शर्तें पढ़ें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Terms of Use — Ek Bata Shoonya', description: 'Terms of use पढ़ें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Terms of Use — Ek Bata Shoonya', description: 'Terms of use padhein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Terms of Use — Ek Bata Shoonya', description: 'Read our terms of use.', lang: 'en', ogLocale: 'en_US' },
  },
  'contact': {
    'hi-shuddh': { title: 'सम्पर्क — एक बटा शून्य', description: 'हमसे सम्पर्क करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Contact — Ek Bata Shoonya', description: 'हमसे contact करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Contact — Ek Bata Shoonya', description: 'Humse contact karein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Contact — Ek Bata Shoonya', description: 'Get in touch with us.', lang: 'en', ogLocale: 'en_US' },
  },
  'register': {
    'hi-shuddh': { title: 'रुचि दर्ज करें — एक बटा शून्य', description: 'नई सामग्री की सूचना प्राप्त करने के लिए रुचि दर्ज करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Register Interest — Ek Bata Shoonya', description: 'नए content की notification पाने के लिए register करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Register Interest — Ek Bata Shoonya', description: 'Naye content ki notification paane ke liye register karein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Register Interest — Ek Bata Shoonya', description: 'Register your interest to get notified about new content.', lang: 'en', ogLocale: 'en_US' },
  },
};

const MODES: LanguageMode[] = ['hi-shuddh', 'hi-mixed', 'hinglish', 'en'];

function getAllRoutes(): string[] {
  const routes: string[] = [];
  for (const mode of MODES) {
    for (const route of Object.keys(routeMeta)) {
      routes.push(route ? `${mode}/${route}` : mode);
    }
  }
  return routes;
}

function getMetaForRoute(routePath: string): RouteMeta | null {
  const parts = routePath.split('/');
  const mode = parts[0] as LanguageMode;
  const subRoute = parts.slice(1).join('/');
  return routeMeta[subRoute]?.[mode] || null;
}

function generateHtml(templateHtml: string, routePath: string): string {
  const meta = getMetaForRoute(routePath);
  if (!meta) return templateHtml;

  const canonicalUrl = `${SITE_URL}/${routePath}/`;
  let html = templateHtml;

  // Replace <html lang="...">
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${meta.lang}"`);

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(meta.description)}"`
  );

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(meta.title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(meta.description)}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta property="og:locale" content="[^"]*"/, `<meta property="og:locale" content="${meta.ogLocale}"`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}"`);

  // Replace canonical
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);

  // Add hreflang alternates before </head>
  const parts = routePath.split('/');
  const subRoute = parts.slice(1).join('/');
  const hreflangLinks = MODES.map(mode => {
    const altUrl = `${SITE_URL}/${mode}${subRoute ? '/' + subRoute : ''}/`;
    const hreflang = mode === 'en' ? 'en' : mode === 'hinglish' ? 'hi-Latn' : 'hi';
    return `<link rel="alternate" hreflang="${hreflang}" href="${altUrl}" />`;
  }).join('\n    ');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`;
  
  html = html.replace('</head>', `    ${hreflangLinks}\n    ${xDefault}\n  </head>`);

  return html;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function staticRoutesPlugin(): Plugin {
  return {
    name: 'static-routes-generator',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');

      if (!fs.existsSync(indexPath)) {
        console.warn('[static-routes] dist/index.html not found, skipping.');
        return;
      }

      const templateHtml = fs.readFileSync(indexPath, 'utf-8');
      const routes = getAllRoutes();

      console.log(`[static-routes] Generating ${routes.length} static route pages...`);

      for (const route of routes) {
        const routeDir = path.join(distDir, route);
        const routeIndexPath = path.join(routeDir, 'index.html');

        // Don't overwrite if it already exists
        if (fs.existsSync(routeIndexPath)) continue;

        fs.mkdirSync(routeDir, { recursive: true });
        const html = generateHtml(templateHtml, route);
        fs.writeFileSync(routeIndexPath, html, 'utf-8');
      }

      console.log(`[static-routes] ✅ Generated ${routes.length} route pages.`);
    },
  };
}
