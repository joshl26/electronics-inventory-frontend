import React, { useState, useEffect, lazy } from "react";
import LoadingPage from "components/layout/LoadingPage";
const LandingPage = lazy(() => import("./LandingPage"));

const Public = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <section>
      <LandingPage />
    </section>
  );
};

export default Public;
