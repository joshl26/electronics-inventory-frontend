import React from "react";

const PrivacyPage = () => {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
      <h2>Privacy Policy</h2>

      <section>
        <h3>Information We Collect</h3>
        <p>
          We collect personal information that you provide to us directly, such
          as your name, email address, and any other information you choose to
          provide.
        </p>
      </section>

      <section>
        <h3>How We Use Your Information</h3>
        <p>
          Your information is used to provide, maintain, and improve our
          services, communicate with you, and comply with legal obligations.
        </p>
      </section>

      <section>
        <h3>Cookies and Tracking</h3>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience and analyze usage patterns.
        </p>
      </section>

      <section>
        <h3>Data Security</h3>
        <p>
          We implement reasonable security measures to protect your information
          from unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section>
        <h3>Your Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal
          information. Contact us if you wish to exercise these rights.
        </p>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at <a href="mailto:privacy@example.com">privacy@example.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
