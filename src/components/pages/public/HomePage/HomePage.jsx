import React, { useState, useEffect, lazy } from "react";
import LoadingPage from "components/pages/LoadingPage";
const LandingSection = lazy(() => import("./LandingSection"));

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <section>
      <LandingSection />
    </section>
  );
};

export default HomePage;
