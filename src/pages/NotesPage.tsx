import { useState, useMemo } from 'react';
import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';
import { analytics } from '@/lib/analytics';
import { Breadcrumbs } from '@/components/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, ExternalLink, Code, Clock } from 'lucide-react';
import notesData from '@/content/notes/index.json';

export function NotesPage() {
  const { mode } = useMode();
  const { t } = useTranslations(mode);

  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');

  const filteredNotes = useMemo(() => {
    return notesData.notes.filter((note) => {
      if (selectedCourse !== 'all' && note.course !== selectedCourse) return false;
      if (selectedType !== 'all' && note.type !== selectedType) return false;
      if (selectedMode !== 'all' && !note.modes.includes(selectedMode)) return false;
      return true;
    });
  }, [selectedCourse, selectedType, selectedMode]);

  const getTitle = (note: typeof notesData.notes[0]) => {
    if (mode === 'hi-shuddh' && note.titleHindi) return note.titleHindi;
    return note.title;
  };

  const handleViewPdf = (pdfPath: string) => {
    const pdfName = pdfPath.split('/').pop() || pdfPath;
    analytics.openNotesPdf(pdfName);
  };

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('notes') }]} />
      
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('notes')}</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {mode === 'en'
            ? 'Download PDF notes, cheatsheets, and LaTeX files.'
            : mode === 'hinglish'
            ? 'PDF notes, cheatsheets, aur LaTeX files download karein.'
            : mode === 'hi-shuddh'
            ? 'पीडीएफ़ टिप्पणियाँ, चीटशीट, और लाटेक्स फ़ाइलें डाउनलोड करें।'
            : 'PDF notes, cheatsheets, और LaTeX files download करें।'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('filterBy')}:</span>
        </div>
        
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('allCourses')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allCourses')}</SelectItem>
            {notesData.courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {mode === 'hi-shuddh' ? course.nameHindi : course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t('allTypes')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allTypes')}</SelectItem>
            {notesData.types.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMode} onValueChange={setSelectedMode}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t('allModes')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allModes')}</SelectItem>
            <SelectItem value="hi-shuddh">हिन्दी (शुद्ध)</SelectItem>
            <SelectItem value="hi-mixed">हिन्दी + English</SelectItem>
            <SelectItem value="hinglish">Hinglish</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Coming Soon Notice */}
      <Card className="mb-8 border-dashed">
        <CardContent className="flex items-center gap-4 py-6">
          <Clock className="h-8 w-8 text-muted-foreground" />
          <div>
            <h3 className="font-medium">
              {mode === 'en' ? 'More notes coming soon' : mode === 'hinglish' ? 'Aur notes jaldi aa rahe hain' : mode === 'hi-shuddh' ? 'और टिप्पणियाँ शीघ्र आ रही हैं' : 'और notes जल्द आ रहे हैं'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {mode === 'en'
                ? 'We are preparing downloadable PDFs and LaTeX notes for all lectures.'
                : mode === 'hinglish'
                ? 'Hum sabhi lectures ke liye downloadable PDFs aur LaTeX notes prepare kar rahe hain.'
                : mode === 'hi-shuddh'
                ? 'हम सभी व्याख्यानों के लिए डाउनलोड करने योग्य पीडीएफ़ और लाटेक्स टिप्पणियाँ तैयार कर रहे हैं।'
                : 'हम सभी lectures के लिए downloadable PDFs और LaTeX notes prepare कर रहे हैं।'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredNotes.length === 0 ? (
          <p className="text-muted-foreground col-span-2 text-center py-8">
            {mode === 'en'
              ? 'No notes found. Try changing the filters.'
              : mode === 'hinglish'
              ? 'Koi notes nahi mile. Filters change karke dekhein.'
              : mode === 'hi-shuddh'
              ? 'कोई टिप्पणियाँ नहीं मिलीं। फ़िल्टर बदलकर देखें।'
              : 'कोई notes नहीं मिले। Filters change करके देखें।'}
          </p>
        ) : (
          filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <FileText className="h-6 w-6 text-primary" />
                  <Badge variant="outline">{note.type.toUpperCase()}</Badge>
                </div>
                <CardTitle className="text-lg">{getTitle(note)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {note.modes.map((m) => (
                    <Badge key={m} variant="secondary" className="text-xs">
                      {m === 'hi-shuddh' ? 'शुद्ध' : m === 'hi-mixed' ? 'Mixed' : m === 'en' ? 'EN' : 'Roman'}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {mode === 'en' ? 'Last updated:' : mode === 'hinglish' ? 'Last updated:' : mode === 'hi-shuddh' ? 'अंतिम अद्यतन:' : 'Last updated:'} {note.lastUpdated}
                </p>

                <div className="flex gap-2 flex-wrap">
                  {note.pdfPath && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      asChild
                      onClick={() => handleViewPdf(note.pdfPath!)}
                    >
                      <a href={note.pdfPath} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        {t('view')}
                      </a>
                    </Button>
                  )}
                  {note.pdfPath && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={note.pdfPath} download>
                        <Download className="h-4 w-4 mr-1" />
                        {t('download')}
                      </a>
                    </Button>
                  )}
                  {note.latexPath && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={note.latexPath} target="_blank" rel="noopener noreferrer">
                        <Code className="h-4 w-4 mr-1" />
                        LaTeX
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
