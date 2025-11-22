// definition: HomePage component that shows a loading page for 1.2 seconds before rendering the LandingSection.
// file: src/components/pages/public/HomePage/HomePage.jsx

import React, { Suspense, lazy } from "react";
import LoadingPage from "components/pages/LoadingPage";
import CustomerGallerySection from "./CustomersSection";
import SEO from "components/common/SEO/SEO";
import { seoData } from "data/seoData";

const CustomerReviewsSection = lazy(() =>
  import("components/pages/public/HomePage/CustomerReviewsSection")
);

const HeroSection = lazy(() => import("./HeroSection"));

const HomePage = () => {
  return (
    <main aria-busy="true" aria-live="polite">
      <SEO
        title={seoData.home.title}
        description={seoData.home.description}
        keywords={seoData.home.keywords}
        structuredData={seoData.home.structuredData}
        canonicalUrl={window.location.origin}
      />
      <Suspense fallback={<LoadingPage />}>
        <HeroSection />
        <CustomerGallerySection />
        <CustomerReviewsSection />
      </Suspense>
    </main>
  );
};

export default HomePage;
