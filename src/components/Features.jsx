import React, { useState, useEffect } from 'react';
import LoginHeader from '../features/pages/LoginHeader';
import './Features.scss';
import LoginFooter from '../features/pages/LoginFooter';

function Features() {
  const [colorMode, setColorMode] = useState(
    () => JSON.parse(localStorage.getItem('colorMode')) ?? 'Light'
  );

  let featuresStyle = '';
  if (colorMode === 'Light') {
    featuresStyle = 'features-light';
  } else if (colorMode === 'Dark') {
    featuresStyle = 'features-dark';
  }

  const onChangeColorMode = (mode) => {
    const next = mode === 'Light' ? 'Dark' : 'Light';
    localStorage.setItem('colorMode', JSON.stringify(next));
    setColorMode(next);
  };

  useEffect(() => {
    const storedColorMode = JSON.parse(localStorage.getItem('colorMode'));
    if (storedColorMode === null) {
      localStorage.setItem('colorMode', JSON.stringify('Light'));
      setColorMode('Light');
    }
    // run once on mount
  }, []);

  return (
    <>
      <LoginHeader onChangeColorMode={onChangeColorMode} colorMode={colorMode} />
      <section className={featuresStyle}>
        <div className="spacer" />
        <h1 className="features-header-text">Features</h1>
      </section>
      <LoginFooter colorMode={colorMode} />
    </>
  );
}

export default Features;
