// src/config/siteConfig.js

/**
 * Central configuration file for site-wide settings
 * This includes company information, contact details, URLs, and other constants
 */

// Get the current site URL dynamically
const getSiteUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://electronics-inventory-client.onrender.com/'; // Fallback for SSR or build time
  };
  
  export const siteConfig = {
    // Site Identity
    site: {
      name: 'Electronics Inventory',
      tagline: 'Smart Parts Management for Makers and Engineers',
      description: 'Electronics parts inventory management system for makers, engineers, and businesses. Track components, organize your workspace, and never lose track of parts again.',
      url: getSiteUrl(),
      domain: 'electronicsinventory.com',
      language: 'en',
      locale: 'en_US',
    },
  
    // Company Information
    company: {
      name: 'Electronics Inventory Inc.',
      legalName: 'Electronics Inventory, Inc.',
      foundingYear: 2022,
      description: 'We provide inventory management solutions for electronics professionals and hobbyists.',
      address: {
        street: '123 Tech Avenue',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'United States',
      },
    },
  
    // Contact Information
    contact: {
      email: {
        support: 'support@electronicsinventory.com',
        sales: 'sales@electronicsinventory.com',
        privacy: 'privacy@electronicsinventory.com',
        legal: 'legal@electronicsinventory.com',
        general: 'info@electronicsinventory.com',
      },
      phone: {
        support: '+1-555-0100',
        sales: '+1-555-0101',
      },
      hours: {
        support: 'Monday - Friday, 9am - 5pm EST',
        timezone: 'America/New_York',
      },
    },
  
    // Social Media Links
    social: {
      twitter: 'https://twitter.com/electronicsinventory',
      facebook: 'https://facebook.com/electronicsinventory',
      linkedin: 'https://www.linkedin.com/in/joshrlehman/',
      github: 'https://github.com/electronicsinventory',
      youtube: 'https://youtube.com/@electronicsinventory',
      instagram: 'https://instagram.com/electronicsinventory',
    },
  
    // Branding & Assets
    branding: {
      logo: '/android-chrome-384x384.png',
      logoSmall: '/android-chrome-192x192.png',
      favicon: '/favicon.ico',
      appleTouchIcon: '/apple-touch-icon.png',
      themeColor: '#0d6efd',
      backgroundColor: '#ffffff',
    },
  
    // SEO Defaults
    seo: {
      defaultTitle: 'Electronics Inventory - Parts Management System',
      titleTemplate: '%s | Electronics Inventory',
      defaultDescription: 'Manage your electronics parts inventory efficiently with our comprehensive tracking system.',
      keywords: [
        'electronics inventory',
        'parts management',
        'component tracking',
        'inventory system',
        'electronics organization',
        'parts database',
        'component database',
        'maker tools',
        'engineer tools',
      ],
      openGraph: {
        type: 'website',
        siteName: 'Electronics Inventory',
        imageWidth: 1200,
        imageHeight: 630,
      },
      twitter: {
        handle: '@electronicsinventory',
        site: '@electronicsinventory',
        cardType: 'summary_large_image',
      },
    },
  
    // Features & Limits
    features: {
      free: {
        maxParts: 100,
        maxUsers: 1,
        storage: '100MB',
        support: 'Community',
      },
      pro: {
        maxParts: 'Unlimited',
        maxUsers: 5,
        storage: '10GB',
        support: 'Priority',
        price: 19,
        currency: 'USD',
        billingPeriod: 'month',
      },
      enterprise: {
        maxParts: 'Unlimited',
        maxUsers: 'Unlimited',
        storage: 'Unlimited',
        support: 'Dedicated',
        price: 'Custom',
      },
    },
  
    // API Configuration
    api: {
      baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3500',
      version: 'v1',
      timeout: 30000,
    },
  
    // Application Settings
    app: {
      version: '0.1.0',
      environment: import.meta.env.MODE || 'development',
      isProd: import.meta.env.PROD || false,
      isDev: import.meta.env.DEV || true,
    },
  
    // Navigation Links
    navigation: {
      main: [
        { name: 'Home', path: '/', public: true },
        { name: 'Features', path: '/features', public: true },
        { name: 'Pricing', path: '/pricing', public: true },
        { name: 'About', path: '/about', public: true },
        { name: 'Contact', path: '/contact', public: true },
      ],
      footer: {
        product: [
          { name: 'Features', path: '/features' },
          { name: 'Pricing', path: '/pricing' },
          { name: 'Roadmap', path: '/roadmap' },
          { name: 'Changelog', path: '/changelog' },
        ],
        company: [
          { name: 'About', path: '/about' },
          { name: 'Blog', path: '/blog' },
          { name: 'Careers', path: '/careers' },
          { name: 'Contact', path: '/contact' },
        ],
        support: [
          { name: 'Help Center', path: '/help' },
          { name: 'Documentation', path: '/docs' },
          { name: 'API Reference', path: '/api-docs' },
          { name: 'Status', path: '/status' },
        ],
        legal: [
          { name: 'Privacy Policy', path: '/privacy' },
          { name: 'Terms of Service', path: '/terms' },
          { name: 'Cookie Policy', path: '/cookies' },
          { name: 'GDPR', path: '/gdpr' },
        ],
      },
    },
  
    // Legal & Compliance
    legal: {
      privacyPolicyUrl: '/privacy',
      termsOfServiceUrl: '/terms',
      cookiePolicyUrl: '/cookies',
      gdprEmail: 'privacy@electronicsinventory.com',
      lastUpdated: {
        privacy: '2025-11-21',
        terms: '2025-11-21',
        cookies: '2025-11-21',
      },
    },
  
    // Analytics & Tracking
    analytics: {
      googleAnalyticsId: import.meta.env.VITE_GA_ID || null,
      googleTagManagerId: import.meta.env.VITE_GTM_ID || null,
      facebookPixelId: import.meta.env.VITE_FB_PIXEL_ID || null,
      hotjarId: import.meta.env.VITE_HOTJAR_ID || null,
    },
  
    // External Services
    services: {
      stripe: {
        publishableKey: import.meta.env.VITE_STRIPE_KEY || '',
      },
      sentry: {
        dsn: import.meta.env.VITE_SENTRY_DSN || '',
      },
      cloudinary: {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME || '',
      },
    },
  
    // Rate Limits & Constraints
    limits: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      maxImagesPerPart: 5,
      searchDebounceMs: 300,
      requestTimeout: 30000,
    },
  
    // Error Messages
    messages: {
      errors: {
        generic: 'Something went wrong. Please try again.',
        network: 'Network error. Please check your connection.',
        unauthorized: 'You need to be logged in to access this.',
        forbidden: 'You don\'t have permission to access this.',
        notFound: 'The requested resource was not found.',
        serverError: 'Server error. Please try again later.',
      },
      success: {
        saved: 'Changes saved successfully!',
        created: 'Item created successfully!',
        updated: 'Item updated successfully!',
        deleted: 'Item deleted successfully!',
      },
    },
  };
  
  // Helper function to get full URL for a path
  export const getFullUrl = (path = '') => {
    return `${siteConfig.site.url}${path}`;
  };
  
  // Helper function to get asset URL
  export const getAssetUrl = (asset) => {
    return `${siteConfig.site.url}${asset}`;
  };
  
  // Helper function to format title with template
  export const formatTitle = (pageTitle) => {
    if (!pageTitle) return siteConfig.seo.defaultTitle;
    return siteConfig.seo.titleTemplate.replace('%s', pageTitle);
  };
  
  // Helper function to get social links as array
  export const getSocialLinks = () => {
    return Object.entries(siteConfig.social)
      .filter(([_, url]) => url) // Only include non-empty URLs
      .map(([platform, url]) => ({
        platform,
        url,
        name: platform.charAt(0).toUpperCase() + platform.slice(1),
      }));
  };
  
  // Helper function to check if feature is available in plan
  export const hasFeature = (plan, feature) => {
    return siteConfig.features[plan]?.[feature] !== undefined;
  };
  
  // Export individual sections for convenience
  export const { site, company, contact, social, branding, seo, features, api, app } = siteConfig;
  
  export default siteConfig;