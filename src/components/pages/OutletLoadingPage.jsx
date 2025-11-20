import Lottie from "lottie-react";
import React from "react";
import HamburgerIcon from "svg/HamburgerMenu.json";

const LoadingPage = () => {
  const content = (
    <section>
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
