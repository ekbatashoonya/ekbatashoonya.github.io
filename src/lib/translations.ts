// UI Translations for all three modes
import { LanguageMode } from './modes';

type TranslationKey = 
  | 'home'
  | 'courses'
  | 'notes'
  | 'blog'
  | 'about'
  | 'startLearning'
  | 'browseNotes'
  | 'newsletter'
  | 'emailPlaceholder'
  | 'subscribe'
  | 'whatIsThis'
  | 'whoIsThisFor'
  | 'howToUse'
  | 'copyright'
  | 'suggestImprovement'
  | 'contact'
  | 'missionStatement'
  | 'notAvailable'
  | 'switchToAvailable'
  | 'objectives'
  | 'prerequisites'
  | 'examples'
  | 'exercises'
  | 'previous'
  | 'next'
  | 'overview'
  | 'syllabus'
  | 'lectures'
  | 'view'
  | 'download'
  | 'viewLatex'
  | 'filterBy'
  | 'allCourses'
  | 'allTopics'
  | 'allModes'
  | 'allTypes'
  | 'heroTitle'
  | 'heroSubtitle'
  | 'welcomeMessage';

type Translations = Record<TranslationKey, string>;

const translations: Record<LanguageMode, Translations> = {
  'hi-shuddh': {
    home: 'मुखपृष्ठ',
    courses: 'पाठ्यक्रम',
    notes: 'टिप्पणियाँ',
    blog: 'अद्यतन',
    about: 'परिचय',
    startLearning: 'सीखना आरम्भ करें',
    browseNotes: 'टिप्पणियाँ देखें',
    newsletter: 'समाचार पत्र',
    emailPlaceholder: 'अपना ईमेल लिखें',
    subscribe: 'सदस्यता लें',
    whatIsThis: 'यह क्या है?',
    whoIsThisFor: 'यह किसके लिए है?',
    howToUse: 'इसका उपयोग कैसे करें?',
    copyright: '© एक बटा शून्य',
    suggestImprovement: 'सुधार सुझाएँ',
    contact: 'सम्पर्क',
    missionStatement: 'हमारा उद्देश्य',
    notAvailable: 'इस भाषा में उपलब्ध नहीं',
    switchToAvailable: 'उपलब्ध भाषा में देखें',
    objectives: 'उद्देश्य',
    prerequisites: 'पूर्वापेक्षाएँ',
    examples: 'उदाहरण',
    exercises: 'अभ्यास',
    previous: 'पिछला',
    next: 'अगला',
    overview: 'अवलोकन',
    syllabus: 'पाठ्यक्रम',
    lectures: 'व्याख्यान',
    view: 'देखें',
    download: 'डाउनलोड',
    viewLatex: 'लाटेक्स देखें',
    filterBy: 'छाँटें',
    allCourses: 'सभी पाठ्यक्रम',
    allTopics: 'सभी विषय',
    allModes: 'सभी भाषाएँ',
    allTypes: 'सभी प्रकार',
    heroTitle: 'एक बटा शून्य',
    heroSubtitle: 'गणित को सरल बनाना',
    welcomeMessage: 'स्वागत है',
  },
  'hi-mixed': {
    home: 'Home',
    courses: 'Courses',
    notes: 'Notes',
    blog: 'Blog',
    about: 'About',
    startLearning: 'सीखना शुरू करें',
    browseNotes: 'Notes देखें',
    newsletter: 'Newsletter',
    emailPlaceholder: 'आपका email',
    subscribe: 'Subscribe करें',
    whatIsThis: 'यह क्या है?',
    whoIsThisFor: 'यह किसके लिए है?',
    howToUse: 'कैसे use करें?',
    copyright: '© Ek Bata Shoonya',
    suggestImprovement: 'सुधाव सुझाएँ',
    contact: 'Contact',
    missionStatement: 'हमारा Mission',
    notAvailable: 'इस mode में available नहीं',
    switchToAvailable: 'Available mode में देखें',
    objectives: 'Objectives',
    prerequisites: 'Prerequisites',
    examples: 'Examples',
    exercises: 'Exercises',
    previous: 'Previous',
    next: 'Next',
    overview: 'Overview',
    syllabus: 'Syllabus',
    lectures: 'Lectures',
    view: 'View',
    download: 'Download',
    viewLatex: 'LaTeX देखें',
    filterBy: 'Filter by',
    allCourses: 'All Courses',
    allTopics: 'All Topics',
    allModes: 'All Modes',
    allTypes: 'All Types',
    heroTitle: 'Ek Bata Shoonya',
    heroSubtitle: 'गणित को simple बनाना',
    welcomeMessage: 'Welcome!',
  },
  'hinglish': {
    home: 'Home',
    courses: 'Courses',
    notes: 'Notes',
    blog: 'Blog',
    about: 'About',
    startLearning: 'Seekhna shuru karein',
    browseNotes: 'Notes dekhein',
    newsletter: 'Newsletter',
    emailPlaceholder: 'Aapka email',
    subscribe: 'Subscribe karein',
    whatIsThis: 'Yeh kya hai?',
    whoIsThisFor: 'Yeh kiske liye hai?',
    howToUse: 'Kaise use karein?',
    copyright: '© Ek Bata Shoonya',
    suggestImprovement: 'Sudhaav suggest karein',
    contact: 'Contact',
    missionStatement: 'Hamara Mission',
    notAvailable: 'Is mode mein available nahi',
    switchToAvailable: 'Available mode mein dekhein',
    objectives: 'Objectives',
    prerequisites: 'Prerequisites',
    examples: 'Examples',
    exercises: 'Exercises',
    previous: 'Previous',
    next: 'Next',
    overview: 'Overview',
    syllabus: 'Syllabus',
    lectures: 'Lectures',
    view: 'View',
    download: 'Download',
    viewLatex: 'LaTeX dekhein',
    filterBy: 'Filter by',
    allCourses: 'All Courses',
    allTopics: 'All Topics',
    allModes: 'All Modes',
    allTypes: 'All Types',
    heroTitle: 'Ek Bata Shoonya',
    heroSubtitle: 'Maths ko simple banana',
    welcomeMessage: 'Welcome!',
  },
};

export function getTranslation(mode: LanguageMode, key: TranslationKey): string {
  return translations[mode][key] || translations['hi-mixed'][key] || key;
}

export function useTranslations(mode: LanguageMode) {
  return {
    t: (key: TranslationKey) => getTranslation(mode, key),
    translations: translations[mode],
  };
}
