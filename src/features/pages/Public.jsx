import React, { useState, useEffect } from "react";
import LoginHeader from "./LoginHeader";
import LoadingPage from "layout/LoadingPage";
import "./Public.scss";
import LandingPage from "./LandingPage";
import CustomerGallery from "./CustomerGallery";
import { NewSignup } from "features/users";
import LoginFooter from "./LoginFooter";

const Public = () => {
  const [loading, setLoading] = useState(true);
  const [colorMode, setColorMode] = useState(() => {
    const savedMode = localStorage.getItem("colorMode");
    return savedMode ? JSON.parse(savedMode) : "Light";
  });

  const publicStyle = colorMode === "Light" ? "public-light" : "public-dark";

  const onChangeColorMode = () => {
    const newMode = colorMode === "Light" ? "Dark" : "Light";
    localStorage.setItem("colorMode", JSON.stringify(newMode));
    setColorMode(newMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const content = loading ? (
    <LoadingPage />
  ) : (
    <section className={publicStyle}>
      <LoginHeader
        onChangeColorMode={onChangeColorMode}
        colorMode={colorMode}
      />
      <LandingPage colorMode={colorMode} />
      <CustomerGallery />
      <NewSignup colorMode={colorMode} />
      <LoginFooter colorMode={colorMode} />
    </section>
  );

  return content;
};

export default Public;