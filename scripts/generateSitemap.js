// scripts/generateSitemap.js
// Run this script to generate sitemap.xml from siteConfig

import siteConfig from '../src/config/siteConfig.js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Define page configurations
const pages = [
  {
    path: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/features',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/pricing',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/login',
    changefreq: 'yearly',
    priority: 0.5,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/signup',
    changefreq: 'yearly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/privacy',
    changefreq: 'monthly',
    priority: 0.3,
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/terms',
    changefreq: 'monthly',
    priority: 0.3,
    lastmod: new Date().toISOString().split('T')[0],
  },
];

// Generate sitemap XML
const generateSitemap = () => {
  const { url } = siteConfig.site;
  
  const urlEntries = pages
    .map(
      ({ path, changefreq, priority, lastmod }) => `
  <url>
    <loc>${url}${path === '/' ? '' : path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return sitemap;
};

// Generate robots.txt
const generateRobotsTxt = () => {
  const { url } = siteConfig.site;
  
  return `# robots.txt for ${siteConfig.site.name}

# Allow all crawlers to access public pages
User-agent: *
Allow: /
Allow: /features
Allow: /pricing
Allow: /about
Allow: /contact
Allow: /login
Allow: /signup
Allow: /privacy
Allow: /terms

# Disallow private/dashboard pages
Disallow: /dash/
Disallow: /dash/*

# Disallow API endpoints
Disallow: /api/
Disallow: /api/*

# Disallow upload directories
Disallow: /upload/

# Disallow authentication pages from indexing
Disallow: /*?token=*
Disallow: /*?reset=*

# Sitemap location
Sitemap: ${url}/sitemap.xml
`;
};

// Write files
const writeSitemapFiles = () => {
  try {
    // Generate sitemap
    const sitemap = generateSitemap();
    const sitemapPath = resolve(process.cwd(), 'public', 'sitemap.xml');
    writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('✅ Sitemap generated at:', sitemapPath);

    // Generate robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = resolve(process.cwd(), 'public', 'robots.txt');
    writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log('✅ robots.txt generated at:', robotsPath);

    console.log('\n📄 Files generated successfully!');
    console.log(`\nSitemap URL: ${siteConfig.site.url}/sitemap.xml`);
    console.log(`Robots.txt URL: ${siteConfig.site.url}/robots.txt`);
  } catch (error) {
    console.error('❌ Error generating files:', error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  writeSitemapFiles();
}

export { generateSitemap, generateRobotsTxt, writeSitemapFiles };