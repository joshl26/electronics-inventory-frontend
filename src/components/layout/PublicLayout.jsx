import React from "react";
import { Helmet } from "react-helmet";
import PublicFooter from "components/layout/Footer/PublicFooter";
import PublicHeader from "components/layout/Header/PublicHeader";
import { Outlet } from "react-router-dom";
import siteConfig from "config/siteConfig";
import { organizationStructuredData } from "data/seoData";

const PublicLayout = () => {
  const { site, branding, seo } = siteConfig;

  return (
    <>
      {/* Global SEO settings that apply to all public pages */}
      <Helmet>
        {/* Default meta tags (can be overridden by individual pages) */}
        <html lang={site.language} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={branding.themeColor} />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href={branding.appleTouchIcon} />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        {/* <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" /> */}
        <meta
          httpEquiv="Referrer-Policy"
          content="no-referrer-when-downgrade"
        />

        {/* Default title and description (will be overridden by page-specific SEO) */}
        <title>{seo.defaultTitle}</title>
        <meta name="description" content={seo.defaultDescription} />

        {/* Default Open Graph tags */}
        <meta property="og:site_name" content={site.name} />
        <meta property="og:type" content={seo.openGraph.type} />

        {/* Global structured data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
      </Helmet>

      <PublicHeader />
      {/* Use Bootstrap padding top utility class */}
      <div className="pt-5 min-vh-100">
        <Outlet />
      </div>
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
