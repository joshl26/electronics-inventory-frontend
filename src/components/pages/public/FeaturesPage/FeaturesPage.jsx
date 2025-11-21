import React from "react";

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
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
      <h2>Features</h2>
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {features.map(({ id, title, description, icon }) => (
          <div
            key={id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "1rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
              {icon}
            </div>
            <h3>{title}</h3>
            <p style={{ color: "#555" }}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
