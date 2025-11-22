// src/data/seoData.js
import siteConfig from '../config/siteConfig';

const { site, company, contact, branding, features } = siteConfig;

// Get site URL with fallback
const getSiteUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return site.url;
};

const siteUrl = getSiteUrl();

export const seoData = {
  home: {
    title: 'Home - Electronics Parts Inventory Management',
    description: site.description,
    keywords: 'electronics inventory, parts management, component tracking, electronics organization, inventory system',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: siteUrl,
      description: site.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  },

  features: {
    title: 'Features - Powerful Inventory Management Tools',
    description: 'Discover powerful features including real-time tracking, advanced search, bulk operations, custom categorization, and detailed analytics for your electronics parts inventory.',
    keywords: 'inventory features, parts tracking, component search, inventory analytics, bulk operations',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Features',
      description: `${site.name} Management Features`,
      url: `${siteUrl}/features`,
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: site.name,
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        featureList: [
          'Real-time inventory tracking',
          'Advanced search and filtering',
          'Bulk operations',
          'Custom categorization',
          'Detailed analytics and reporting',
          'Multi-user support',
          'Data import/export'
        ]
      }
    }
  },

  pricing: {
    title: 'Pricing - Simple and Transparent Plans',
    description: 'Choose the perfect plan for your inventory needs. From free starter plans to enterprise solutions, we have pricing options for individuals, teams, and businesses of all sizes.',
    keywords: 'pricing plans, subscription, inventory pricing, free plan, enterprise plan',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Pricing',
      description: `${site.name} Pricing Plans`,
      url: `${siteUrl}/pricing`,
      mainEntity: [
        {
          '@type': 'Offer',
          name: 'Starter Plan',
          price: '0',
          priceCurrency: 'USD',
          description: `Up to ${features.free.maxParts} parts, perfect for hobbyists and small projects`,
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: features.free.maxUsers,
            unitText: 'User'
          }
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan',
          price: features.pro.price.toString(),
          priceCurrency: features.pro.currency,
          billingIncrement: features.pro.billingPeriod,
          description: `${features.pro.maxParts} parts for professionals and growing teams`,
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: features.pro.maxUsers,
            unitText: 'Users'
          }
        },
        {
          '@type': 'Offer',
          name: 'Enterprise Plan',
          description: 'Custom solutions for large organizations',
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            unitText: features.enterprise.maxUsers
          }
        }
      ]
    }
  },

  contact: {
    title: 'Contact Us - Get in Touch',
    description: `Have questions about ${site.name}? Contact our support team for help with features, pricing, technical issues, or general inquiries.`,
    keywords: 'contact, support, help, customer service, get in touch',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact',
      description: `Contact ${site.name} Support`,
      url: `${siteUrl}/contact`,
      mainEntity: {
        '@type': 'Organization',
        name: company.name,
        url: siteUrl,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          availableLanguage: [site.language],
          email: contact.email.support,
          telephone: contact.phone.support,
          hoursAvailable: contact.hours.support
        }
      }
    }
  },

  login: {
    title: 'Login - Access Your Inventory',
    description: `Sign in to your ${site.name} account to manage your parts, track components, and access your dashboard.`,
    keywords: 'login, sign in, account access, user login',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Login',
      description: `Login to ${site.name}`,
      url: `${siteUrl}/login`
    }
  },

  signup: {
    title: 'Sign Up - Create Your Free Account',
    description: `Create a free ${site.name} account today. Start organizing your electronics parts and components with our powerful management system.`,
    keywords: 'sign up, register, create account, free account, get started',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Sign Up',
      description: `Create an ${site.name} Account`,
      url: `${siteUrl}/signup`,
      potentialAction: {
        '@type': 'RegisterAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/signup`
        }
      }
    }
  },

  about: {
    title: 'About Us - Our Mission and Story',
    description: `Learn about ${site.name}, our mission to help makers and engineers organize their components, and the team behind the platform.`,
    keywords: 'about us, company info, mission, team, our story',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About',
      description: `About ${site.name}`,
      url: `${siteUrl}/about`,
      mainEntity: {
        '@type': 'Organization',
        name: company.name,
        url: siteUrl,
        description: company.description,
        foundingDate: company.foundingYear.toString(),
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressRegion: company.address.state,
          postalCode: company.address.zip,
          addressCountry: company.address.country
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: contact.email.support,
          telephone: contact.phone.support
        },
        sameAs: Object.values(siteConfig.social).filter(Boolean)
      }
    }
  },

  privacy: {
    title: 'Privacy Policy - Your Data Security',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information and inventory data.',
    keywords: 'privacy policy, data protection, privacy, security, GDPR',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy',
      description: `${site.name} Privacy Policy`,
      url: `${siteUrl}/privacy`,
      dateModified: siteConfig.legal.lastUpdated.privacy
    }
  },

  terms: {
    title: 'Terms of Service - User Agreement',
    description: `Review our terms of service, user agreement, and conditions for using the ${site.name} platform.`,
    keywords: 'terms of service, user agreement, terms and conditions, legal',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Terms of Service',
      description: `${site.name} Terms of Service`,
      url: `${siteUrl}/terms`,
      dateModified: siteConfig.legal.lastUpdated.terms
    }
  }
};

// Organization structured data (use on all pages via PublicLayout)
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  legalName: company.legalName,
  url: siteUrl,
  logo: `${siteUrl}${branding.logo}`,
  description: company.description,
  foundingDate: company.foundingYear.toString(),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: contact.email.support,
    telephone: contact.phone.support,
    availableLanguage: [site.language]
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: company.address.country
  },
  sameAs: Object.values(siteConfig.social).filter(Boolean)
};

// BreadcrumbList helper
export const generateBreadcrumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`
  }))
});