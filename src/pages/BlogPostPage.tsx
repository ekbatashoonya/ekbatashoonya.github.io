import { useParams } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { getBlogPostBySlug } from '@/content/data';
import { getBlogContent } from '@/content/loader';
import { Breadcrumbs, MarkdownRenderer } from '@/components/content';
import { NotAvailablePage } from './NotAvailablePage';
import { Calendar } from 'lucide-react';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { mode } = useMode();
  const { blogPath } = useModePath();
  const { t } = useTranslations(mode);

  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const content = slug ? getBlogContent(slug, mode) : null;

  if (!post) {
    return <NotAvailablePage />;
  }

  if (!content || !post.availableModes.includes(mode)) {
    return <NotAvailablePage availableModes={post.availableModes} />;
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs 
        items={[
          { label: t('blog'), href: blogPath },
          { label: post.title[mode] }
        ]} 
      />

      <article className="max-w-3xl mx-auto">
        <h1 className="sr-only">{post.title[mode]}</h1>
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                mode === 'hinglish' ? 'en-IN' : 'hi-IN',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </time>
          </div>
        </header>

        <MarkdownRenderer content={content} />
      </article>
    </div>
  );
}
