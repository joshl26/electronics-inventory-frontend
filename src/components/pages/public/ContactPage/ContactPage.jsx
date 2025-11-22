import { useState } from "react";
import "./ContactPage.scss";
import { generateBreadcrumbs, seoData } from "data/seoData";
import SEO from "components/common/SEO/SEO";

const ContactPage = () => {
  const breadcrumbs = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const combinedStructuredData = [seoData.contact.structuredData, breadcrumbs];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (formData.phone.trim() && !/^\+?[\d\s\-()]{7,}$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      // Handle submission error here
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page-container" role="main">
      <SEO
        title={seoData.contact.title}
        description={seoData.contact.description}
        keywords={seoData.contact.keywords}
        structuredData={combinedStructuredData}
        canonicalUrl={`${window.location.origin}/contact`}
      />
      <h2 tabIndex={-1}>Contact Us</h2>

      {submitted && (
        <div
          className="success-message"
          role="alert"
          aria-live="assertive"
          tabIndex={0}
        >
          Thank you for your message!
          <button
            aria-label="Dismiss success message"
            onClick={() => setSubmitted(false)}
            className="dismiss-btn"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-describedby="form-errors">
        <fieldset disabled={submitting} style={{ border: "none", padding: 0 }}>
          <div className="form-group">
            <label htmlFor="name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <p className="error-message" id="name-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <p className="error-message" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="+1 555 123 4567"
            />
            {errors.phone && (
              <p className="error-message" id="phone-error" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              required
            />
            {errors.message && (
              <p className="error-message" id="message-error" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="submit-btn"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </fieldset>
      </form>
    </main>
  );
};

export default ContactPage;
