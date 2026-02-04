import { useParams, Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { getCourseBySlug, getLectureBySlug, getAdjacentLectures } from '@/content/data';
import { getLectureContent } from '@/content/loader';
import { Breadcrumbs, MarkdownRenderer, LectureNav } from '@/components/content';
import { NotAvailablePage } from './NotAvailablePage';

export function LecturePage() {
  const { courseSlug, lectureSlug } = useParams<{ courseSlug: string; lectureSlug: string }>();
  const { mode } = useMode();
  const { getPath, coursesPath } = useModePath();
  const { t } = useTranslations(mode);

  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;
  const lecture = courseSlug && lectureSlug ? getLectureBySlug(courseSlug, lectureSlug) : undefined;
  const content = courseSlug && lectureSlug ? getLectureContent(courseSlug, lectureSlug, mode) : null;

  if (!course || !lecture) {
    return <NotAvailablePage />;
  }

  if (!content || !lecture.availableModes.includes(mode)) {
    return <NotAvailablePage availableModes={lecture.availableModes} />;
  }

  const { prev, next } = getAdjacentLectures(courseSlug!, lectureSlug!);

  const prevLecture = prev && prev.availableModes.includes(mode) ? {
    title: prev.title[mode],
    href: getPath(`courses/${courseSlug}/${prev.slug}`),
  } : undefined;

  const nextLecture = next && next.availableModes.includes(mode) ? {
    title: next.title[mode],
    href: getPath(`courses/${courseSlug}/${next.slug}`),
  } : undefined;

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs 
        items={[
          { label: t('courses'), href: coursesPath },
          { label: course.title[mode], href: getPath(`courses/${course.slug}`) },
          { label: lecture.title[mode] }
        ]} 
      />

      <article className="max-w-3xl mx-auto">
        <MarkdownRenderer content={content} />
        
        <LectureNav 
          prevLecture={prevLecture}
          nextLecture={nextLecture}
        />
      </article>
    </div>
  );
}
