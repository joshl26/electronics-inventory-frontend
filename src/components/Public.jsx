import React, { useState, useEffect } from 'react';
import LoginHeader from '../features/pages/LoginHeader';
import Experience from './Experience';

import LoadingPage from './LoadingPage';
import './Public.scss';

const Public = () => {
  const [loading, setLoading] = useState(true);

  const [colorMode, setColorMode] = useState(
    () =>
      // default to 'Light' if not present
      JSON.parse(localStorage.getItem('colorMode')) ?? 'Light'
  );

  // compute publicStyle without nested ternary
  let publicStyle = '';
  if (colorMode === 'Light') {
    publicStyle = 'public-light';
  } else if (colorMode === 'Dark') {
    publicStyle = 'public-dark';
  }

  const backgroundColor = colorMode === 'Light' ? '#e76f51' : '#264653';

  const onChangeColorMode = (e) => {
    // toggle color mode (keeps API compatible with your previous usage)
    if (e === 'Light') {
      localStorage.setItem('colorMode', JSON.stringify('Dark'));
      setColorMode('Dark');
    } else {
      localStorage.setItem('colorMode', JSON.stringify('Light'));
      setColorMode('Light');
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // ensure localStorage has a value on first mount (no shadowing)
  useEffect(() => {
    const storedColorMode = JSON.parse(localStorage.getItem('colorMode'));
    if (storedColorMode === null) {
      localStorage.setItem('colorMode', JSON.stringify('Light'));
      setColorMode('Light');
    }
  }, []);

  const content = loading ? (
    <LoadingPage />
  ) : (
    <section className={publicStyle}>
      <LoginHeader onChangeColorMode={onChangeColorMode} colorMode={colorMode} />
      <Experience colorMode={colorMode} backgroundColor={backgroundColor} />
    </section>
  );

  return content;
};

export default Public;
