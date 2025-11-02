// src/components/PublicLayout.jsx
import React, { memo, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoginHeader from './Header';
import LoginFooter from './Footer';

function PublicLayout() {
  const [colorMode, setColorMode] = useState(
    () =>
      // default to 'Light' if not present
      JSON.parse(localStorage.getItem('colorMode')) ?? 'Light'
  );

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

  // ensure localStorage has a value on first mount (no shadowing)
  useEffect(() => {
    const storedColorMode = JSON.parse(localStorage.getItem('colorMode'));
    if (storedColorMode === null) {
      localStorage.setItem('colorMode', JSON.stringify('Light'));
      setColorMode('Light');
    }
  }, []);

  return (
    <>
      <a href="#main" className="skip-link visually-hidden-focusable">
        Skip to content
      </a>

      <LoginHeader onChangeColorMode={onChangeColorMode} colorMode={colorMode} />

      <main id="main" role="main">
        <Outlet colorMode={colorMode} />
      </main>

      <LoginFooter colorMode={colorMode} />
    </>
  );
}

export default memo(PublicLayout);
