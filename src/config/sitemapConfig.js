/* eslint-disable import/no-anonymous-default-export */
// src/config/sitemapConfig.js
// Configuration for sitemap generation

import siteConfig from "./siteConfig";

/**
 * Sitemap page configurations
 * Each page includes path, change frequency, priority, and optional last modified date
 */
export const sitemapPages = [
  {
    path: "/",
    changefreq: "daily",
    priority: 1.0,
    description: "Home page - highest priority",
  },
  {
    path: "/features",
    changefreq: "weekly",
    priority: 0.8,
    description: "Features page - key conversion page",
  },
  {
    path: "/pricing",
    changefreq: "weekly",
    priority: 0.8,
    description: "Pricing page - key conversion page",
  },
  {
    path: "/about",
    changefreq: "monthly",
    priority: 0.6,
    description: "About page - supporting content",
  },
  {
    path: "/contact",
    changefreq: "monthly",
    priority: 0.7,
    description: "Contact page - important but stable",
  },
  {
    path: "/login",
    changefreq: "yearly",
    priority: 0.5,
    description: "Login page - utility page",
  },
  {
    path: "/signup",
    changefreq: "yearly",
    priority: 0.7,
    description: "Signup page - important conversion point",
  },
  {
    path: "/privacy",
    changefreq: "monthly",
    priority: 0.3,
    description: "Privacy policy - legal page",
  },
  {
    path: "/terms",
    changefreq: "monthly",
    priority: 0.3,
    description: "Terms of service - legal page",
  },
];

/**
 * Robots.txt configuration
 */
export const robotsConfig = {
  allow: [
    "/",
    "/features",
    "/pricing",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/privacy",
    "/terms",
  ],
  disallow: [
    "/dash/",
    "/dash/*",
    "/api/",
    "/api/*",
    "/upload/",
    "/*?token=*",
    "/*?reset=*",
  ],
  crawlDelay: {
    // Optional: Set crawl delay for specific bots
    // 'Googlebot': 0,
    // 'Bingbot': 1,
  },
  blockedBots: [
    // Optional: Block specific bad bots
    // 'BadBot',
  ],
};

/**
 * Generate sitemap XML string
 */
export const generateSitemapXML = () => {
  const { url } = siteConfig.site;
  const today = new Date().toISOString().split("T")[0];

  const urlEntries = sitemapPages
    .map(({ path, changefreq, priority }) => {
      const loc = path === "/" ? url : `${url}${path}`;
      return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${today}</lastmod>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Generate robots.txt string
 */
export const generateRobotsTxt = () => {
  const { url, name } = siteConfig.site;

  let robotsTxt = `# robots.txt for ${name}\n\n`;

  // User-agent rules
  robotsTxt += `# Allow all crawlers to access public pages\n`;
  robotsTxt += `User-agent: *\n`;

  // Allow rules
  robotsConfig.allow.forEach((path) => {
    robotsTxt += `Allow: ${path}\n`;
  });

  robotsTxt += `\n# Disallow private/dashboard pages\n`;
  robotsConfig.disallow.forEach((path) => {
    robotsTxt += `Disallow: ${path}\n`;
  });

  // Crawl delay (if specified)
  if (Object.keys(robotsConfig.crawlDelay).length > 0) {
    robotsTxt += `\n# Crawl delay for specific bots\n`;
    Object.entries(robotsConfig.crawlDelay).forEach(([bot, delay]) => {
      robotsTxt += `User-agent: ${bot}\n`;
      robotsTxt += `Crawl-delay: ${delay}\n\n`;
    });
  }

  // Block specific bots (if specified)
  if (robotsConfig.blockedBots.length > 0) {
    robotsTxt += `\n# Block bad bots\n`;
    robotsConfig.blockedBots.forEach((bot) => {
      robotsTxt += `User-agent: ${bot}\n`;
      robotsTxt += `Disallow: /\n\n`;
    });
  }

  // Sitemap location
  robotsTxt += `\n# Sitemap location\n`;
  robotsTxt += `Sitemap: ${url}/sitemap.xml\n`;

  return robotsTxt;
};

/**
 * Get full URL for a path
 */
export const getPageUrl = (path) => {
  const { url } = siteConfig.site;
  return path === "/" ? url : `${url}${path}`;
};

/**
 * Get all public pages for navigation/sitemap
 */
export const getPublicPages = () => {
  return sitemapPages.map((page) => ({
    ...page,
    url: getPageUrl(page.path),
  }));
};

export default {
  pages: sitemapPages,
  robots: robotsConfig,
  generateSitemapXML,
  generateRobotsTxt,
  getPageUrl,
  getPublicPages,
};
