// definition of LoadingPage component
// file: src/components/pages/public/LoadingPage.jsx 

import Lottie from "lottie-react";
import React from "react";
import { Image } from "react-bootstrap";
import HamburgerIcon from "svg/HamburgerMenu.json";
import background from "img/background_2.png";
import "./LoadingPage.scss";

const LoadingPage = () => {
  return (
    <section>
      <Image className="loading-background" src={background} />
      <Lottie
        className="hamburger-icon"
        animationData={HamburgerIcon}
        loop={true}
      />
    </section>
  );
};

export default LoadingPage;
