import { useMode } from '@/contexts/ModeContext';
import { useTranslations } from '@/lib/translations';
import { Breadcrumbs } from '@/components/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TermsPage() {
  const { mode } = useMode();
  const { t } = useTranslations(mode);

  const content = {
    'en': {
      title: 'Terms of Use',
      lastUpdated: 'Last updated: February 2025',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: 'By accessing and using Ek Bata Shoonya, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.',
        },
        {
          title: 'Use of Content',
          content: `The educational content on this website is provided for personal, non-commercial use. You may:
          
• View, download, and print content for personal study
• Share links to our content
• Reference our content with proper attribution

You may not:
• Reproduce content for commercial purposes without permission
• Modify or create derivative works without permission
• Remove any copyright or attribution notices`,
        },
        {
          title: 'User Conduct',
          content: `When using our website and services, you agree to:
          
• Provide accurate information when registering interest
• Use the website in a lawful manner
• Respect the intellectual property rights of others`,
        },
        {
          title: 'Disclaimer',
          content: `The content on this website is provided "as is" for educational purposes. We make no warranties about:
          
• The accuracy or completeness of the content
• The availability of the website
• The suitability of the content for any particular purpose

Use of this website is at your own risk.`,
        },
        {
          title: 'Limitation of Liability',
          content: 'To the maximum extent permitted by law, Ek Bata Shoonya shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website.',
        },
        {
          title: 'Changes to Terms',
          content: 'We may update these Terms of Use from time to time. Continued use of the website after changes constitutes acceptance of the new terms.',
        },
      ],
    },
    'hi-mixed': {
      title: 'Terms of Use',
      lastUpdated: 'Last updated: February 2025',
      sections: [
        {
          title: 'Terms की स्वीकृति',
          content: 'Ek Bata Shoonya को access और use करके, आप इन Terms of Use से बंधे होने के लिए सहमत हैं। अगर आप इन terms से सहमत नहीं हैं, तो कृपया हमारी website का उपयोग न करें।',
        },
        {
          title: 'Content का उपयोग',
          content: `इस website पर educational content personal, non-commercial use के लिए है। आप:
          
• Personal study के लिए content देख, download और print कर सकते हैं
• हमारे content के links share कर सकते हैं
• Proper attribution के साथ हमारे content को reference कर सकते हैं

आप यह नहीं कर सकते:
• Permission के बिना commercial purposes के लिए reproduce करना
• Permission के बिना modify या derivative works बनाना`,
        },
        {
          title: 'Disclaimer',
          content: 'इस website पर content "as is" educational purposes के लिए provide किया गया है। हम content की accuracy या completeness की guarantee नहीं देते।',
        },
      ],
    },
    'hinglish': {
      title: 'Terms of Use',
      lastUpdated: 'Last updated: February 2025',
      sections: [
        {
          title: 'Terms ki Acceptance',
          content: 'Ek Bata Shoonya ko access aur use karke, aap in Terms of Use se bound hone ke liye agree karte hain. Agar aap in terms se agree nahi hain, toh please hamari website ka use na karein.',
        },
        {
          title: 'Content ka Use',
          content: `Is website par educational content personal, non-commercial use ke liye hai. Aap:
          
• Personal study ke liye content dekh, download aur print kar sakte hain
• Hamare content ke links share kar sakte hain
• Proper attribution ke saath hamare content ko reference kar sakte hain

Aap yeh nahi kar sakte:
• Permission ke bina commercial purposes ke liye reproduce karna
• Permission ke bina modify ya derivative works banana`,
        },
        {
          title: 'Disclaimer',
          content: 'Is website par content "as is" educational purposes ke liye provide kiya gaya hai. Hum content ki accuracy ya completeness ki guarantee nahi dete.',
        },
      ],
    },
    'hi-shuddh': {
      title: 'उपयोग की शर्तें',
      lastUpdated: 'अंतिम अद्यतन: फ़रवरी २०२५',
      sections: [
        {
          title: 'शर्तों की स्वीकृति',
          content: 'एक बटा शून्य को प्रयोग करके, आप इन उपयोग की शर्तों से बंधे होने के लिए सहमत हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।',
        },
        {
          title: 'सामग्री का उपयोग',
          content: `इस वेबसाइट पर शैक्षिक सामग्री व्यक्तिगत, गैर-वाणिज्यिक उपयोग के लिए है। आप:
          
• व्यक्तिगत अध्ययन के लिए सामग्री देख, डाउनलोड और मुद्रित कर सकते हैं
• हमारी सामग्री के लिंक साझा कर सकते हैं
• उचित श्रेय के साथ हमारी सामग्री का संदर्भ ले सकते हैं`,
        },
        {
          title: 'अस्वीकरण',
          content: 'इस वेबसाइट पर सामग्री "जैसी है" शैक्षिक उद्देश्यों के लिए प्रदान की गई है। हम सामग्री की सटीकता या पूर्णता की गारंटी नहीं देते।',
        },
      ],
    },
  };

  const pageContent = content[mode];

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <Breadcrumbs items={[{ label: t('terms') }]} />
      
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
