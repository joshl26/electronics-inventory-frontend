import React, { useState, useEffect } from 'react';
import './FeaturesPage.css';

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

  // const onChangeColorMode = (mode) => {
  //   const next = mode === 'Light' ? 'Dark' : 'Light';
  //   localStorage.setItem('colorMode', JSON.stringify(next));
  //   setColorMode(next);
  // };

  useEffect(() => {
    const storedColorMode = JSON.parse(localStorage.getItem('colorMode'));
    if (storedColorMode === null) {
      localStorage.setItem('colorMode', JSON.stringify('Light'));
      setColorMode('Light');
    }
    // run once on mount
  }, []);

  return (
    <section className={featuresStyle}>
      <div className="spacer" />
      <h1 className="features-header-text">Features</h1>
    </section>
  );
}

export default Features;
