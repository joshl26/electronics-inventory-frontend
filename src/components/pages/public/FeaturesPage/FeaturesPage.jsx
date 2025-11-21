import React from "react";
import "./FeaturesPage.scss";

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
  return (
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
  );
};

export default FeaturesPage;
