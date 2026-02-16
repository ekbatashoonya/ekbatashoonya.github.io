/**
 * Vite Plugin: Static Route HTML Generator
 * 
 * Generates individual index.html files for each SPA route at build time.
 * This ensures GitHub Pages returns HTTP 200 (not 404) for every route,
 * and injects route-specific meta tags so crawlers see correct titles,
 * descriptions, and canonical URLs without executing JavaScript.
 * 
 * Only hi-mixed content pages are indexable. All other modes and thin
 * pages get <meta name="robots" content="noindex, follow">.
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
const INDEXABLE_MODE: LanguageMode = 'hi-mixed';
const NOINDEX_ROUTES = new Set(['notes', 'contact', 'register']);

// Route metadata for all pages × all modes
const routeMeta: Record<string, Record<LanguageMode, RouteMeta>> = {
  '': {
    'hi-shuddh': { title: 'एक बटा शून्य — हिन्दी में गणित की नींव', description: 'शून्य से अनंत तक — गणित की सुदृढ़ नींव, तर्क और अवधारणात्मक स्पष्टता। वीडियो व्याख्यान और संरचित टिप्पणियों के साथ। पंजीकरण करें!', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi', description: 'शून्य से अनंत तक — mathematics की strong foundations, conceptual clarity, video lectures और structured notes। Hindi में free maths education platform।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi', description: 'Shoonya se anant tak — mathematics ki strong foundations aur conceptual clarity. Video lectures aur structured notes ke saath. Register karein!', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Ek Bata Shoonya — Foundations of Mathematics in Hindi', description: 'From zero to infinity — building strong foundations in mathematics through logic and conceptual clarity. With video lectures and structured notes.', lang: 'en', ogLocale: 'en_US' },
  },
  'courses': {
    'hi-shuddh': { title: 'पाठ्यक्रम — एक बटा शून्य', description: 'सभी उपलब्ध गणित पाठ्यक्रम देखें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Courses — Ek Bata Shoonya', description: 'सभी available mathematics courses देखें — Mathematical Logic से शुरू करें। Hindi में free video lectures और structured notes के साथ step-by-step learning।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Courses — Ek Bata Shoonya', description: 'Sabhi available maths courses dekhein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Courses — Ek Bata Shoonya', description: 'Browse all available mathematics courses.', lang: 'en', ogLocale: 'en_US' },
  },
  'courses/mathematical-logic': {
    'hi-shuddh': { title: 'गणितीय तर्कशास्त्र — एक बटा शून्य', description: 'तर्कशास्त्र के मूलभूत सिद्धांतों का अध्ययन — कथन, सत्य-मूल्य, और तार्किक संयोजक।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Mathematical Logic — Ek Bata Shoonya', description: 'Mathematical Logic course — statements, truth values, और logical connectives को Hindi में समझें। Beginner-friendly lectures और structured notes के साथ।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Mathematical Logic — Ek Bata Shoonya', description: 'Logic ke fundamental principles ka study — statements, truth values, aur logical connectives.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Mathematical Logic — Ek Bata Shoonya', description: 'Study the fundamental principles of logic — statements, truth values, and logical connectives.', lang: 'en', ogLocale: 'en_US' },
  },
  'courses/mathematical-logic/logic-lecture-0': {
    'hi-shuddh': { title: 'व्याख्यान ० — आधारभूत अवधारणाएँ — एक बटा शून्य', description: 'गणितीय तर्कशास्त्र की आधारभूत अवधारणाएँ — कथन, सत्य-मूल्य, और तार्किक आधार।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Lecture 0 — Basic Concepts — Ek Bata Shoonya', description: 'Mathematical Logic की basic concepts — statements, truth values, propositions, और logical reasoning की शुरुआत। Hindi में free lecture notes।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Lecture 0 — Basic Concepts — Ek Bata Shoonya', description: 'Mathematical Logic ki basic concepts — statements, truth values, aur logical reasoning ki shuruat.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Lecture 0 — Basic Concepts — Ek Bata Shoonya', description: 'Introduction to basic concepts of Mathematical Logic — statements, truth values, and logical reasoning.', lang: 'en', ogLocale: 'en_US' },
  },
  'notes': {
    'hi-shuddh': { title: 'टिप्पणियाँ — एक बटा शून्य', description: 'पीडीएफ़ टिप्पणियाँ और चीटशीट डाउनलोड करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Notes — Ek Bata Shoonya', description: 'PDF notes, cheatsheets, और LaTeX files download करें — Mathematical Logic और अन्य courses के लिए structured study material।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Notes — Ek Bata Shoonya', description: 'PDF notes aur cheatsheets download karein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Notes — Ek Bata Shoonya', description: 'Download PDF notes and cheatsheets.', lang: 'en', ogLocale: 'en_US' },
  },
  'blog': {
    'hi-shuddh': { title: 'अद्यतन — एक बटा शून्य', description: 'नवीनतम समाचार और अद्यतन पढ़ें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Blog — Ek Bata Shoonya', description: 'Ek Bata Shoonya के latest updates, announcements, और articles पढ़ें। New courses, videos, और features के बारे में जानें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Blog — Ek Bata Shoonya', description: 'Latest news aur updates padhein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Blog — Ek Bata Shoonya', description: 'Read the latest news and updates.', lang: 'en', ogLocale: 'en_US' },
  },
  'blog/welcome': {
    'hi-shuddh': { title: 'एक बटा शून्य में आपका स्वागत है! — एक बटा शून्य', description: 'हम एक बटा शून्य का शुभारम्भ करते हुए अत्यंत प्रसन्न हैं — हिन्दी में गणित शिक्षा का एक नया मंच।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Welcome to Ek Bata Shoonya! — Ek Bata Shoonya', description: 'Ek Bata Shoonya launch हो रहा है — Hindi में mathematics education का एक free platform। Video lectures, notes, और courses जल्द आ रहे हैं।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Welcome to Ek Bata Shoonya! — Ek Bata Shoonya', description: 'Hum Ek Bata Shoonya ka launch karte hue bahut excited hain — Hindi mein maths education ka ek naya platform.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Welcome to Ek Bata Shoonya! — Ek Bata Shoonya', description: 'We are excited to launch Ek Bata Shoonya — a free mathematics education platform in Hindi with video lectures and notes.', lang: 'en', ogLocale: 'en_US' },
  },
  'about': {
    'hi-shuddh': { title: 'परिचय — एक बटा शून्य', description: 'एक बटा शून्य के बारे में जानें — हमारा उद्देश्य, दृष्टि, और टीम।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'About — Ek Bata Shoonya', description: 'Ek Bata Shoonya के बारे में जानें — हमारा mission mathematics को Hindi में accessible बनाना है। Community-driven, free, और open-source।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'About — Ek Bata Shoonya', description: 'Ek Bata Shoonya ke baare mein jaanein — hamara mission maths ko Hindi mein accessible banana hai.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'About — Ek Bata Shoonya', description: 'Learn about Ek Bata Shoonya — our mission is to make mathematics accessible in Hindi. Community-driven, free, and open-source.', lang: 'en', ogLocale: 'en_US' },
  },
  'privacy': {
    'hi-shuddh': { title: 'गोपनीयता नीति — एक बटा शून्य', description: 'एक बटा शून्य की गोपनीयता नीति — हम आपकी जानकारी कैसे संग्रहित और उपयोग करते हैं।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Privacy Policy — Ek Bata Shoonya', description: 'Ek Bata Shoonya की privacy policy — हम क्या information collect करते हैं, कैसे use करते हैं, और आपके rights क्या हैं। GDPR compliant।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Privacy Policy — Ek Bata Shoonya', description: 'Ek Bata Shoonya ki privacy policy — hum kya information collect karte hain aur kaise use karte hain.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Privacy Policy — Ek Bata Shoonya', description: 'Ek Bata Shoonya privacy policy — what information we collect, how we use it, and your data rights. GDPR compliant.', lang: 'en', ogLocale: 'en_US' },
  },
  'terms': {
    'hi-shuddh': { title: 'उपयोग की शर्तें — एक बटा शून्य', description: 'एक बटा शून्य की उपयोग की शर्तें — सामग्री का उपयोग, अस्वीकरण, और दायित्व।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Terms of Use — Ek Bata Shoonya', description: 'Ek Bata Shoonya की terms of use — content का उपयोग, user conduct, disclaimer, और liability की जानकारी। Educational content free है।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Terms of Use — Ek Bata Shoonya', description: 'Ek Bata Shoonya ki terms of use — content ka use, user conduct, aur disclaimer ki jaankari.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Terms of Use — Ek Bata Shoonya', description: 'Ek Bata Shoonya terms of use — content usage, user conduct, disclaimers, and liability. Educational content is free.', lang: 'en', ogLocale: 'en_US' },
  },
  'contact': {
    'hi-shuddh': { title: 'सम्पर्क — एक बटा शून्य', description: 'हमसे सम्पर्क करें — ईमेल, सोशल मीडिया, और अन्य माध्यम।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Contact — Ek Bata Shoonya', description: 'Ek Bata Shoonya से contact करें — email, GitHub, YouTube, Twitter, और Instagram। Questions और feedback welcome हैं।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Contact — Ek Bata Shoonya', description: 'Ek Bata Shoonya se contact karein — email, GitHub, YouTube, Twitter, aur Instagram.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Contact — Ek Bata Shoonya', description: 'Get in touch with Ek Bata Shoonya — email, GitHub, YouTube, Twitter, and Instagram. Questions and feedback welcome.', lang: 'en', ogLocale: 'en_US' },
  },
  'register': {
    'hi-shuddh': { title: 'रुचि दर्ज करें — एक बटा शून्य', description: 'नई सामग्री की सूचना प्राप्त करने के लिए रुचि दर्ज करें।', lang: 'hi', ogLocale: 'hi_IN' },
    'hi-mixed': { title: 'Register Interest — Ek Bata Shoonya', description: 'Ek Bata Shoonya के नए videos, notes, और courses की notification पाने के लिए interest register करें। Free mathematics education।', lang: 'hi', ogLocale: 'hi_IN' },
    'hinglish': { title: 'Register Interest — Ek Bata Shoonya', description: 'Naye content ki notification paane ke liye register karein.', lang: 'hi', ogLocale: 'hi_IN' },
    'en': { title: 'Register Interest — Ek Bata Shoonya', description: 'Register your interest to get notified about new videos, notes, and courses from Ek Bata Shoonya.', lang: 'en', ogLocale: 'en_US' },
  },
};

const MODES: LanguageMode[] = ['hi-shuddh', 'hi-mixed', 'hinglish', 'en'];

function shouldNoindex(mode: LanguageMode, subRoute: string): boolean {
  if (mode !== INDEXABLE_MODE) return true;
  const baseRoute = subRoute.split('/')[0] || '';
  if (NOINDEX_ROUTES.has(baseRoute)) return true;
  return false;
}

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

  const parts = routePath.split('/');
  const mode = parts[0] as LanguageMode;
  const subRoute = parts.slice(1).join('/');

  const canonicalUrl = `${SITE_URL}/${routePath}/`;
  const noindex = shouldNoindex(mode, subRoute);
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

  // Add noindex for non-indexable pages (before </head>)
  if (noindex) {
    html = html.replace('</head>', `    <meta name="robots" content="noindex, follow" />\n  </head>`);
  }

  // NO hreflang tags — removed per SEO strategy

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
