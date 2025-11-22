import React from "react";
import "./AboutPage.scss";
import { generateBreadcrumbs, seoData } from "data/seoData";
import SEO from "components/common/SEO/SEO";

const technologies = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Redux",
  "Bootstrap",
  "AWS",
  "Render",
];

const AboutPage = () => {
  const breadcrumbs = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  const combinedStructuredData = [seoData.about.structuredData, breadcrumbs];

  return (
    <main className="about-page theme-transition">
      <SEO
        title={seoData.about.title}
        description={seoData.about.description}
        keywords={seoData.about.keywords}
        structuredData={combinedStructuredData}
        canonicalUrl={`${window.location.origin}/about`}
      />
      <h1 className="title">About Electronics Inventory</h1>

      <section className="section">
        <h2 className="heading">Our Mission</h2>
        <p>
          Electronics Inventory is dedicated to providing the best solutions to
          help you succeed. Our mission is to deliver high-quality products with
          exceptional customer service.
        </p>
        <p>
          Founded in 2020, we have grown rapidly thanks to our passionate team
          and loyal customers. We believe in innovation, integrity, and
          continuous improvement.
        </p>
      </section>

      <section className="section">
        <h2 className="heading">Our History</h2>
        <p>
          Starting as a small project, Electronics Inventory quickly evolved
          into a full-fledged SaaS platform. Our founder, Joshua Lehman, built
          this project as a capstone for his career change into software
          engineering.
        </p>
        <p>
          Since launch, we have continuously improved the platform based on user
          feedback and industry trends, aiming to make inventory management
          effortless and efficient.
        </p>
      </section>

      <section className="section">
        <h2 className="heading">What We Do</h2>
        <p>
          Our software helps businesses and individuals efficiently manage
          electronic lab inventory. From tracking thousands of small components
          to managing pricing, discounts, and returns, we provide a
          comprehensive solution.
        </p>
        <p>
          With real-time stock data and automated reorder alerts, you can focus
          on running your business while we handle the inventory details.
        </p>
      </section>

      <section className="section">
        <h2 className="heading">Key Features</h2>
        <ul className="list">
          <li>Real-time inventory tracking and updates</li>
          <li>Easy addition, editing, and deletion of parts</li>
          <li>User authentication and role-based access control</li>
          <li>
            Detailed parts information including images and specifications
          </li>
          <li>Notes and comments management for parts</li>
          <li>Responsive design for desktop and mobile devices</li>
          <li>Robust API with comprehensive documentation</li>
          <li>Cloud-hosted backend and database for reliability</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="heading">Technologies We Use</h2>
        <ul className="techList">
          {technologies.map((tech) => (
            <li key={tech} className="techItem">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="heading">Getting Started</h2>
        <p>
          To get started with Electronics Inventory, you need to create an
          account. Once logged in, you can add new parts, edit existing ones,
          and manage your inventory efficiently.
        </p>
        <p>
          The platform supports multiple user roles, ensuring that only
          authorized personnel can make changes to the inventory.
        </p>
        <p>
          For developers, the API documentation is available to integrate or
          extend the platform’s capabilities.
        </p>
      </section>

      <section className="section">
        <h2 className="heading">Support & Contributions</h2>
        <p>
          We welcome contributions, issues, and feature requests. Feel free to
          check the{" "}
          <a
            href="https://github.com/joshl26/electronics-inventory-frontend/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            issues page
          </a>{" "}
          or submit a pull request.
        </p>
        <p>
          For support, contact us at{" "}
          <a href="mailto:support@electronicsinventory.com" className="link">
            support@electronicsinventory.com
          </a>
          .
        </p>
      </section>

      <section className="section">
        <h2 className="heading">Live Demo & Repositories</h2>
        <ul className="list">
          <li>
            <a
              href="https://github.com/joshl26/electronics-inventory-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Frontend Repository
            </a>
          </li>
          <li>
            <a
              href="https://github.com/joshl26/electronics-inventory-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Backend Repository
            </a>
          </li>
          <li>
            <a
              href="https://electronics-inventory-server.onrender.com/api-docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              API Documentation
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default AboutPage;
