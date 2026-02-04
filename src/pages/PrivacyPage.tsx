import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';
import { Breadcrumbs } from '@/components/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { config } from '@/config';

export function PrivacyPage() {
  const { mode } = useMode();
  const { t } = useTranslations(mode);

  const content = {
    'en': {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: February 2025',
      sections: [
        {
          title: 'Overview',
          content: 'Ek Bata Shoonya ("we", "us", "our") is committed to protecting your privacy. This policy explains what information we collect and how we use it.',
        },
        {
          title: 'Information We Collect',
          content: `We collect the following information when you register your interest:
          
• Email address (required)
• Optional message/feedback

This information is collected via Google Forms and stored in Google Sheets.`,
        },
        {
          title: 'How We Use Your Information',
          content: `We use your email address to:
          
• Send updates about new content (videos, notes, courses)
• Announce important project milestones
• Respond to your feedback or questions

We do not sell, share, or rent your personal information to third parties.`,
        },
        {
          title: 'Analytics',
          content: `We use Plausible Analytics, a privacy-friendly analytics service that:
          
• Does not use cookies
• Does not collect personal data
• Does not track you across websites
• Is fully GDPR compliant

We track anonymous page views and custom events (like button clicks) to understand how our site is used.`,
        },
        {
          title: 'Data Storage',
          content: `Your data is stored in:
          
• Google Forms / Google Sheets (for interest registrations)
• Plausible Analytics (anonymous usage data)

Both services have their own privacy policies and security measures.`,
        },
        {
          title: 'Your Rights',
          content: `You have the right to:
          
• Request access to your data
• Request deletion of your data
• Unsubscribe from our communications

To exercise these rights, contact us at: ${config.contactEmail}`,
        },
        {
          title: 'Contact',
          content: `For privacy-related questions, contact us at: ${config.contactEmail}`,
        },
      ],
    },
    'hi-mixed': {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: February 2025',
      sections: [
        {
          title: 'Overview',
          content: 'Ek Bata Shoonya ("हम", "हमारा") आपकी privacy की रक्षा के लिए प्रतिबद्ध है। यह policy बताती है कि हम क्या information collect करते हैं और उसका उपयोग कैसे करते हैं।',
        },
        {
          title: 'हम क्या Information Collect करते हैं',
          content: `जब आप interest register करते हैं, हम यह information collect करते हैं:
          
• Email address (required)
• Optional message/feedback

यह information Google Forms के माध्यम से collect होती है और Google Sheets में store होती है।`,
        },
        {
          title: 'आपकी Information का उपयोग',
          content: `हम आपके email का उपयोग इसके लिए करते हैं:
          
• नए content (videos, notes, courses) के updates भेजना
• Important project milestones announce करना
• आपके feedback या questions का जवाब देना

हम आपकी personal information को तीसरे पक्ष को नहीं बेचते या share नहीं करते।`,
        },
        {
          title: 'Analytics',
          content: `हम Plausible Analytics use करते हैं, जो privacy-friendly है:
          
• Cookies नहीं use करता
• Personal data collect नहीं करता
• Websites के बीच track नहीं करता
• पूरी तरह GDPR compliant है

हम anonymous page views और custom events track करते हैं।`,
        },
        {
          title: 'Contact',
          content: `Privacy-related questions के लिए contact करें: ${config.contactEmail}`,
        },
      ],
    },
    'hinglish': {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: February 2025',
      sections: [
        {
          title: 'Overview',
          content: 'Ek Bata Shoonya ("hum", "hamara") aapki privacy ki raksha ke liye committed hai. Yeh policy batati hai ki hum kya information collect karte hain aur uska use kaise karte hain.',
        },
        {
          title: 'Hum kya Information Collect karte hain',
          content: `Jab aap interest register karte hain, hum yeh information collect karte hain:
          
• Email address (required)
• Optional message/feedback

Yeh information Google Forms ke through collect hoti hai aur Google Sheets mein store hoti hai.`,
        },
        {
          title: 'Aapki Information ka Use',
          content: `Hum aapke email ka use iske liye karte hain:
          
• Naye content (videos, notes, courses) ke updates bhejna
• Important project milestones announce karna
• Aapke feedback ya questions ka jawab dena

Hum aapki personal information ko teesre party ko nahi bechte ya share nahi karte.`,
        },
        {
          title: 'Analytics',
          content: `Hum Plausible Analytics use karte hain, jo privacy-friendly hai:
          
• Cookies nahi use karta
• Personal data collect nahi karta
• Websites ke beech track nahi karta

Hum anonymous page views aur custom events track karte hain.`,
        },
        {
          title: 'Contact',
          content: `Privacy-related questions ke liye contact karein: ${config.contactEmail}`,
        },
      ],
    },
    'hi-shuddh': {
      title: 'गोपनीयता नीति',
      lastUpdated: 'अंतिम अद्यतन: फ़रवरी २०२५',
      sections: [
        {
          title: 'अवलोकन',
          content: 'एक बटा शून्य ("हम", "हमारा") आपकी गोपनीयता की रक्षा के लिए प्रतिबद्ध है। यह नीति बताती है कि हम क्या जानकारी संग्रहित करते हैं और उसका उपयोग कैसे करते हैं।',
        },
        {
          title: 'हम क्या जानकारी संग्रहित करते हैं',
          content: `जब आप रुचि दर्ज करते हैं, हम यह जानकारी संग्रहित करते हैं:
          
• ईमेल पता (आवश्यक)
• वैकल्पिक संदेश/प्रतिक्रिया

यह जानकारी गूगल फ़ॉर्म्स के माध्यम से संग्रहित होती है।`,
        },
        {
          title: 'आपकी जानकारी का उपयोग',
          content: `हम आपके ईमेल का उपयोग इसके लिए करते हैं:
          
• नई सामग्री के अद्यतन भेजना
• महत्वपूर्ण परियोजना मील के पत्थर की घोषणा करना
• आपकी प्रतिक्रिया या प्रश्नों का उत्तर देना

हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष को नहीं बेचते।`,
        },
        {
          title: 'विश्लेषण',
          content: `हम प्लॉसिबल एनालिटिक्स का उपयोग करते हैं, जो गोपनीयता-अनुकूल है:
          
• कुकीज़ का उपयोग नहीं करता
• व्यक्तिगत डेटा संग्रहित नहीं करता
• वेबसाइटों के बीच ट्रैक नहीं करता`,
        },
        {
          title: 'सम्पर्क',
          content: `गोपनीयता-संबंधित प्रश्नों के लिए सम्पर्क करें: ${config.contactEmail}`,
        },
      ],
    },
  };

  const pageContent = content[mode];

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('privacy') }]} />
      
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{pageContent.title}</h1>
          <p className="text-sm text-muted-foreground">{pageContent.lastUpdated}</p>
        </div>

        {pageContent.sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
