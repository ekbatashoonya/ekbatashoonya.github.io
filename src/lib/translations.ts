// UI Translations for all four modes
import { LanguageMode } from './modes';

type TranslationKey = 
  | 'register'
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
  | 'welcomeMessage'
  | 'comingSoon'
  | 'launchingSoon'
  | 'registerInterest'
  | 'maybeLater'
  | 'youtubeFirst'
  | 'youtubeFirstDesc'
  | 'subscribeYoutube'
  | 'latestVideo'
  | 'roadmap'
  | 'privacy'
  | 'terms'
  | 'vision';

type Translations = Record<TranslationKey, string>;

const translations: Record<LanguageMode, Translations> = {
  'hi-shuddh': {
    register: 'रुचि दर्ज करें',
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
    comingSoon: 'शीघ्र आ रहा है',
    launchingSoon: 'शीघ्र प्रारम्भ — अद्यतन प्राप्त करें',
    registerInterest: 'रुचि दर्ज करें',
    maybeLater: 'बाद में',
    youtubeFirst: 'यूट्यूब-प्रथम शिक्षण',
    youtubeFirstDesc: 'वीडियो यूट्यूब पर प्रकाशित होंगे। यह वेबसाइट पाठ्यक्रम, टिप्पणियाँ, पीडीएफ़, और अभ्यास प्रश्न प्रदान करेगी।',
    subscribeYoutube: 'यूट्यूब पर सदस्यता लें',
    latestVideo: 'नवीनतम वीडियो यहाँ दिखाई देगा',
    roadmap: 'आगामी योजना',
    privacy: 'गोपनीयता नीति',
    terms: 'उपयोग की शर्तें',
    vision: 'दृष्टिकोण',
  },
  'hi-mixed': {
    register: 'Register करें',
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
    comingSoon: 'Coming Soon',
    launchingSoon: 'Launching soon — updates पाएँ',
    registerInterest: 'Interest register करें',
    maybeLater: 'बाद में',
    youtubeFirst: 'YouTube-first Learning',
    youtubeFirstDesc: 'Videos YouTube पर launch होंगे। यह website syllabi, notes, PDFs, और practice questions provide करेगी।',
    subscribeYoutube: 'YouTube पर Subscribe करें',
    latestVideo: 'Latest video यहाँ दिखेगा',
    roadmap: 'Roadmap',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    vision: 'Vision',
  },
  'hinglish': {
    register: 'Register karein',
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
    comingSoon: 'Coming Soon',
    launchingSoon: 'Launching soon — updates paayein',
    registerInterest: 'Interest register karein',
    maybeLater: 'Baad mein',
    youtubeFirst: 'YouTube-first Learning',
    youtubeFirstDesc: 'Videos YouTube par launch honge. Yeh website syllabi, notes, PDFs, aur practice questions provide karegi.',
    subscribeYoutube: 'YouTube par Subscribe karein',
    latestVideo: 'Latest video yahaan dikhega',
    roadmap: 'Roadmap',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    vision: 'Vision',
  },
  'en': {
    register: 'Register',
    home: 'Home',
    courses: 'Courses',
    notes: 'Notes',
    blog: 'Blog',
    about: 'About',
    startLearning: 'Start Learning',
    browseNotes: 'Browse Notes',
    newsletter: 'Newsletter',
    emailPlaceholder: 'Your email',
    subscribe: 'Subscribe',
    whatIsThis: 'What is this?',
    whoIsThisFor: 'Who is this for?',
    howToUse: 'How to use?',
    copyright: '© Ek Bata Shoonya',
    suggestImprovement: 'Suggest Improvement',
    contact: 'Contact',
    missionStatement: 'Our Mission',
    notAvailable: 'Not available in this language',
    switchToAvailable: 'View in available language',
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
    viewLatex: 'View LaTeX',
    filterBy: 'Filter by',
    allCourses: 'All Courses',
    allTopics: 'All Topics',
    allModes: 'All Modes',
    allTypes: 'All Types',
    heroTitle: 'Ek Bata Shoonya',
    heroSubtitle: 'Making Mathematics Simple',
    welcomeMessage: 'Welcome!',
    comingSoon: 'Coming Soon',
    launchingSoon: 'Launching soon — get updates',
    registerInterest: 'Register Interest',
    maybeLater: 'Maybe Later',
    youtubeFirst: 'YouTube-first Learning',
    youtubeFirstDesc: 'Videos will launch on YouTube. This website will host syllabi, notes, PDFs, references, and exercises.',
    subscribeYoutube: 'Subscribe on YouTube',
    latestVideo: 'Latest video will appear here',
    roadmap: 'Roadmap',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    vision: 'Vision',
  },
};

export function getTranslation(mode: LanguageMode, key: TranslationKey): string {
  return translations[mode][key] || translations['en'][key] || key;
}

export function useTranslations(mode: LanguageMode) {
  return {
    t: (key: TranslationKey) => getTranslation(mode, key),
    translations: translations[mode],
  };
}
