import React, { useState } from "react";
import LandingPage from "../features/pages/LandingPage";
import LoginHeader from "../features/pages/LoginHeader";
// import HeroImage from "../features/pages/HeroImage";
import "./Public.scss";
import LoginFooter from "../features/pages/LoginFooter";
import SwipeUpIcon from "../svg/SwipeUpIcon.json";
import Lottie from "lottie-react";
import CustomerGallery from "../features/pages/CustomerGallery";
import { useEffect, useCallback } from "react";

const Features = () => {
  const [colorMode, setColorMode] = useState(
    JSON.parse(localStorage.getItem("colorMode"))
  );

  const publicStyle =
    colorMode === "Light"
      ? "public-light"
      : "" || colorMode === "Dark"
      ? "public-dark"
      : "";

  const SwipeUpClickHandler = () => {
    window.scrollTo(0, 0);
  };

  const onChangeColorMode = (e) => {
    console.log("On Change Color Mode " + e);

    if (e === "Light") {
      localStorage.setItem("colorMode", JSON.stringify("Dark"));
      setColorMode("Dark");
    } else {
      localStorage.setItem("colorMode", JSON.stringify("Light"));
      setColorMode("Light");
    }
  };

  useEffect(() => {
    const colorMode = JSON.parse(localStorage.getItem("colorMode"));

    if (colorMode === null) {
      localStorage.setItem("colorMode", JSON.stringify("Light"));
      setColorMode("Light");
    }
  }, [colorMode, publicStyle]);

  const content = (
    <>
      <LoginHeader
        onChangeColorMode={onChangeColorMode}
        colorMode={colorMode}
      />
      <section className={publicStyle}></section>
      <LoginFooter colorMode={colorMode} />
    </>
  );

  return content;
};

export default Features;
