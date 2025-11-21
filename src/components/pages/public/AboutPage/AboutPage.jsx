import React from "react";

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "CEO" },
  { id: 2, name: "Bob Smith", role: "CTO" },
  { id: 3, name: "Carol Lee", role: "Lead Developer" },
];

const AboutPage = () => {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
      <h2>About Us</h2>
      <p>
        Welcome to our company! We are dedicated to providing the best solutions
        to help you succeed. Our mission is to deliver high-quality products
        with exceptional customer service.
      </p>
      <p>
        Founded in 2020, we have grown rapidly thanks to our passionate team and
        loyal customers. We believe in innovation, integrity, and continuous
        improvement.
      </p>

      <h3>Meet the Team</h3>
      <ul>
        {teamMembers.map(({ id, name, role }) => (
          <li key={id}>
            <strong>{name}</strong> - {role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
