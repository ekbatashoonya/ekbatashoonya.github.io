import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { useModePath } from '@/hooks/useModePath';
import { useTranslations } from '@/lib/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/content/data';
import { Breadcrumbs } from '@/components/content';

export function BlogPage() {
  const { mode } = useMode();
  const { getPath } = useModePath();
  const { t } = useTranslations(mode);

  const availablePosts = blogPosts.filter((post) => post.availableModes.includes(mode));

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('blog') }]} />
      
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('blog')}</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {mode === 'hinglish'
            ? 'Latest updates, announcements, aur articles.'
            : mode === 'hi-shuddh'
            ? 'नवीनतम अद्यतन, घोषणाएँ, और लेख।'
            : 'Latest updates, announcements, और articles।'}
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {availablePosts.length === 0 ? (
          <p className="text-muted-foreground">
            {mode === 'hinglish'
              ? 'Koi posts available nahi hain is mode mein.'
              : mode === 'hi-shuddh'
              ? 'इस भाषा में कोई लेख उपलब्ध नहीं हैं।'
              : 'इस mode में कोई posts available नहीं हैं।'}
          </p>
        ) : (
          availablePosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(
                      mode === 'hinglish' ? 'en-IN' : 'hi-IN',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </time>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {post.title[mode]}
                </CardTitle>
                <CardDescription>{post.excerpt[mode]}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  to={getPath(`blog/${post.slug}`)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {mode === 'hinglish' ? 'Read more' : mode === 'hi-shuddh' ? 'और पढ़ें' : 'और पढ़ें'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
