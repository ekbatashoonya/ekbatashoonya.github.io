// ============================================
// Application Configuration
// ============================================
// Replace placeholder values before deploying

export const config = {
  // Site info
  siteName: 'Ek Bata Shoonya',
  siteNameHindi: 'एक बटा शून्य',
  siteUrl: 'https://ekbatashoonya.github.io',
  
  // External links - Replace these placeholders!
  youtubeChannelUrl: '' as string, // e.g., 'https://youtube.com/@ekbatashoonya'
  googleFormUrl: '' as string, // e.g., 'https://forms.gle/...'
  contactEmail: 'ekbatashoonya@gmail.com', // Replace with actual email
  githubUrl: 'https://github.com/ekbatashoonya',
  
  // Analytics - Plausible (privacy-friendly, cookie-less)
  // Sign up at https://plausible.io or self-host
  plausible: {
    domain: 'ekbatashoonya.github.io', // Your domain
    scriptUrl: 'https://plausible.io/js/script.js', // Or your self-hosted URL
    enabled: false, // Set to true when ready
  },
  
  // Interest popup
  interestPopup: {
    // How often to show the popup (in days)
    showIntervalDays: 7,
    storageKey: 'ek-bata-shoonya-interest-popup-last-shown',
  },
};

// Type for the config
export type AppConfig = typeof config;
