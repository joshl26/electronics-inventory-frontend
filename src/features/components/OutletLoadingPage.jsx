import React from 'react';
import Lottie from 'lottie-react';
import HamburgerIcon from '../../svg/HamburgerMenu.json';

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
      <Lottie className="hamburger-icon" animationData={HamburgerIcon} loop />
    </section>
  );
}

export default LoadingPage;
