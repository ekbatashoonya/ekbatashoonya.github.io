// Content loading utilities
import { LanguageMode } from '@/lib/modes';

// Import all markdown content statically
// Courses - Logic Lecture 0
import logicLecture0HiShuddh from './courses/mathematical-logic/logic-lecture-0/hi-shuddh.md?raw';
import logicLecture0HiMixed from './courses/mathematical-logic/logic-lecture-0/hi-mixed.md?raw';
import logicLecture0Hinglish from './courses/mathematical-logic/logic-lecture-0/hinglish.md?raw';

// Blog - Welcome
import blogWelcomeHiShuddh from './blog/welcome/hi-shuddh.md?raw';
import blogWelcomeHiMixed from './blog/welcome/hi-mixed.md?raw';
import blogWelcomeHinglish from './blog/welcome/hinglish.md?raw';

// Content maps
const lectureContent: Record<string, Partial<Record<LanguageMode, string>>> = {
  'mathematical-logic/logic-lecture-0': {
    'hi-shuddh': logicLecture0HiShuddh,
    'hi-mixed': logicLecture0HiMixed,
    'hinglish': logicLecture0Hinglish,
    // 'en' content not available yet
  },
};

const blogContent: Record<string, Partial<Record<LanguageMode, string>>> = {
  'welcome': {
    'hi-shuddh': blogWelcomeHiShuddh,
    'hi-mixed': blogWelcomeHiMixed,
    'hinglish': blogWelcomeHinglish,
    // 'en' content not available yet
  },
};

// Get lecture content for a specific mode
export function getLectureContent(courseSlug: string, lectureSlug: string, mode: LanguageMode): string | null {
  const key = `${courseSlug}/${lectureSlug}`;
  return lectureContent[key]?.[mode] ?? null;
}

// Get blog content for a specific mode
export function getBlogContent(slug: string, mode: LanguageMode): string | null {
  return blogContent[slug]?.[mode] ?? null;
}

// Check if content exists for a mode
export function hasLectureContent(courseSlug: string, lectureSlug: string, mode: LanguageMode): boolean {
  return getLectureContent(courseSlug, lectureSlug, mode) !== null;
}

export function hasBlogContent(slug: string, mode: LanguageMode): boolean {
  return getBlogContent(slug, mode) !== null;
}
