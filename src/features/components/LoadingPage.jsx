import React from 'react';
import Lottie from 'lottie-react';
import { Image } from 'react-bootstrap';
import HamburgerIcon from '../../svg/HamburgerMenu.json';
import background from '../../img/background_2.png';

function LoadingPage() {
  const colorMode = JSON.parse(localStorage.getItem('colorMode')) ?? 'Light';

  let publicStyle = '';
  if (colorMode === 'Light') {
    publicStyle = 'public-light';
  } else if (colorMode === 'Dark') {
    publicStyle = 'public-dark';
  }

  return (
    <section className={publicStyle}>
      <Image className="loading-background" src={background} alt="background" />
      <Lottie className="hamburger-icon" animationData={HamburgerIcon} loop />
    </section>
  );
}

export default LoadingPage;
