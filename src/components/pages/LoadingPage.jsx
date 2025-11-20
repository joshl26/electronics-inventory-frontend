import Lottie from "lottie-react";
import React from "react";
import { Image } from "react-bootstrap";
import HamburgerIcon from "svg/HamburgerMenu.json";
import background from "img/background_2.png";

const LoadingPage = () => {
  const content = (
    <section>
      <Image className="loading-background" src={background} />
      <Lottie
        className="hamburger-icon"
        animationData={HamburgerIcon}
        loop={true}
      />
    </section>
  );

  return content;
};

export default LoadingPage;
