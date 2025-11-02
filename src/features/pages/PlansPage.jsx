import React, { useState, useEffect } from 'react';
import './PlansPage.css';

function Plans() {
  const [colorMode, setColorMode] = useState(
    () => JSON.parse(localStorage.getItem('colorMode')) ?? 'Light'
  );

  let plansStyle = '';
  if (colorMode === 'Light') {
    plansStyle = 'plans-light';
  } else if (colorMode === 'Dark') {
    plansStyle = 'plans-dark';
  }

  // const onChangeColorMode = (e) => {
  //   // toggle color mode (keeps API compatible with your previous usage)
  //   if (e === 'Light') {
  //     localStorage.setItem('colorMode', JSON.stringify('Dark'));
  //     setColorMode('Dark');
  //   } else {
  //     localStorage.setItem('colorMode', JSON.stringify('Light'));
  //     setColorMode('Light');
  //   }
  // };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('colorMode'));
    if (stored === null) {
      localStorage.setItem('colorMode', JSON.stringify('Light'));
      setColorMode('Light');
    }
    // run once on mount
  }, []);

  return (
    <section className={plansStyle}>
      <div className="spacer" />
      <h1 className="plans-header-text">Plans</h1>
    </section>
  );
}

export default Plans;
