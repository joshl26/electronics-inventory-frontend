import React from "react";

const TermsPage = () => {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
      <h2>Terms and Conditions</h2>

      <section>
        <h3>Acceptance of Terms</h3>
        <p>
          By accessing or using our services, you agree to be bound by these
          Terms and Conditions.
        </p>
      </section>

      <section>
        <h3>Use of Services</h3>
        <p>
          You agree to use our services only for lawful purposes and in
          accordance with these Terms.
        </p>
      </section>

      <section>
        <h3>Account Responsibilities</h3>
        <p>
          You are responsible for maintaining the confidentiality of your
          account information and for all activities that occur under your
          account.
        </p>
      </section>

      <section>
        <h3>Intellectual Property</h3>
        <p>
          All content and materials provided by us are protected by intellectual
          property laws and may not be used without our permission.
        </p>
      </section>

      <section>
        <h3>Limitation of Liability</h3>
        <p>
          We are not liable for any damages arising from your use of our
          services to the fullest extent permitted by law.
        </p>
      </section>

      <section>
        <h3>Changes to Terms</h3>
        <p>
          We reserve the right to modify these Terms at any time. Continued use
          of the services constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:support@example.com">support@example.com</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
