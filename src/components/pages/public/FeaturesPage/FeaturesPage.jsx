import React from "react";
import "./FeaturesPage.scss";
import { generateBreadcrumbs, seoData } from "data/seoData";
import SEO from "components/common/SEO/SEO";

const features = [
  {
    id: 1,
    title: "Fast Performance",
    description:
      "Our app is optimized for speed and efficiency to give you the best experience.",
    icon: "⚡️",
  },
  {
    id: 2,
    title: "Secure",
    description:
      "We use industry-standard security practices to keep your data safe.",
    icon: "🔒",
  },
  {
    id: 3,
    title: "User Friendly",
    description: "Intuitive design and easy navigation for all users.",
    icon: "👍",
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Our support team is available around the clock to help you.",
    icon: "📞",
  },
];

const FeaturesPage = () => {

  const breadcrumbs = generateBreadcrumbs([
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' }
  ]);

  // Combine structured data
  const combinedStructuredData = [
    seoData.features.structuredData,
    breadcrumbs
  ];

  return (
    <main>
      <SEO
        title={seoData.features.title}
        description={seoData.features.description}
        keywords={seoData.features.keywords}
        structuredData={combinedStructuredData}
        canonicalUrl={`${window.location.origin}/features`}
      />
      
          <section className="features-page theme-transition">
    <header className="features-header">
      <h1 className="features-title">Our Features</h1>
      <p className="features-subtitle">
        Discover the powerful features that make our app stand out.
      </p>
    </header>

    <div className="features-grid" role="list">
      {features.map(({ id, title, description, icon }) => (
        <article
          key={id}
          className="feature-card"
          role="listitem"
          tabIndex={0}
        >
          <div className="feature-icon" aria-hidden="true">
            {icon}
          </div>
          <h2 className="feature-title">{title}</h2>
          <p className="feature-description">{description}</p>
        </article>
      ))}
    </div>
  </section>
</main>
  );
};

export default FeaturesPage;
