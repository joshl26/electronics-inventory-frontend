import React from 'react';
import PropTypes from 'prop-types';
import LandingPage from '../features/pages/LandingPage';
import LoginFooter from '../features/pages/LoginFooter';
import CustomerGallery from '../features/pages/CustomerGallery';
import NewSignup from './NewSignup';
import './Experience.css';

function Experience({ colorMode }) {
  return (
    <>
      <LandingPage colorMode={colorMode} />
      <CustomerGallery />
      <NewSignup colorMode={colorMode} />
      <LoginFooter colorMode={colorMode} />
    </>
  );
}

Experience.propTypes = {
  // restrict to expected values; change if you use other strings
  colorMode: PropTypes.oneOf(['Light', 'Dark']),
};

Experience.defaultProps = {
  colorMode: 'Light',
};

export default Experience;
