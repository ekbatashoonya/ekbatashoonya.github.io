import { LanguageMode } from '@/lib/modes';

// Course and lecture data structures

export interface Lecture {
  id: string;
  title: Record<LanguageMode, string>;
  slug: string;
  order: number;
  availableModes: LanguageMode[];
}

export interface Course {
  id: string;
  title: Record<LanguageMode, string>;
  description: Record<LanguageMode, string>;
  slug: string;
  lectures: Lecture[];
  thumbnail?: string;
}

// Course data
export const courses: Course[] = [
  {
    id: 'mathematical-logic',
    slug: 'mathematical-logic',
    title: {
      'hi-shuddh': 'गणितीय तर्कशास्त्र',
      'hi-mixed': 'Mathematical Logic',
      'hinglish': 'Mathematical Logic',
      'en': 'Mathematical Logic',
    },
    description: {
      'hi-shuddh': 'तर्कशास्त्र के मूलभूत सिद्धांतों का अध्ययन',
      'hi-mixed': 'Logic के fundamental principles का study',
      'hinglish': 'Logic ke fundamental principles ka study',
      'en': 'Study of fundamental principles of logic',
    },
    lectures: [
      {
        id: 'logic-lecture-0',
        slug: 'logic-lecture-0',
        order: 0,
        title: {
          'hi-shuddh': 'व्याख्यान ० — आधारभूत अवधारणाएँ',
          'hi-mixed': 'Lecture 0 — Basic Concepts',
          'hinglish': 'Lecture 0 — Basic Concepts',
          'en': 'Lecture 0 — Basic Concepts',
        },
        availableModes: ['hi-shuddh', 'hi-mixed', 'hinglish'],
      },
      {
        id: 'logic-lecture-1',
        slug: 'logic-lecture-1',
        order: 1,
        title: {
          'hi-shuddh': 'व्याख्यान १ — तार्किक संयोजक',
          'hi-mixed': 'Lecture 1 — Logical Connectives',
          'hinglish': 'Lecture 1 — Logical Connectives',
          'en': 'Lecture 1 — Logical Connectives',
        },
        availableModes: [], // Placeholder - not available yet
      },
    ],
  },
];

// Blog post data
export interface BlogPost {
  id: string;
  slug: string;
  title: Record<LanguageMode, string>;
  excerpt: Record<LanguageMode, string>;
  date: string;
  availableModes: LanguageMode[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'welcome',
    slug: 'welcome',
    title: {
      'hi-shuddh': 'एक बटा शून्य में आपका स्वागत है!',
      'hi-mixed': 'Welcome to Ek Bata Shoonya!',
      'hinglish': 'Welcome to Ek Bata Shoonya!',
      'en': 'Welcome to Ek Bata Shoonya!',
    },
    excerpt: {
      'hi-shuddh': 'हम एक बटा शून्य का शुभारम्भ करते हुए अत्यंत प्रसन्न हैं।',
      'hi-mixed': 'हम Ek Bata Shoonya का launch करते हुए बहुत excited हैं।',
      'hinglish': 'Hum Ek Bata Shoonya ka launch karte hue bahut excited hain.',
      'en': 'We are excited to launch Ek Bata Shoonya.',
    },
    date: '2025-01-01',
    availableModes: ['hi-shuddh', 'hi-mixed', 'hinglish'],
  },
];

// Helper to get course by slug
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

// Helper to get lecture by slug within a course
export function getLectureBySlug(courseSlug: string, lectureSlug: string): Lecture | undefined {
  const course = getCourseBySlug(courseSlug);
  return course?.lectures.find((l) => l.slug === lectureSlug);
}

// Helper to get adjacent lectures
export function getAdjacentLectures(courseSlug: string, lectureSlug: string) {
  const course = getCourseBySlug(courseSlug);
  if (!course) return { prev: undefined, next: undefined };

  const lectures = course.lectures;
  const currentIndex = lectures.findIndex((l) => l.slug === lectureSlug);

  if (currentIndex === -1) return { prev: undefined, next: undefined };

  return {
    prev: currentIndex > 0 ? lectures[currentIndex - 1] : undefined,
    next: currentIndex < lectures.length - 1 ? lectures[currentIndex + 1] : undefined,
  };
}

// Helper to get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
