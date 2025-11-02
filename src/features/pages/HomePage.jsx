import React from 'react';
import './HomePage.css';
import PropTypes from 'prop-types';
import LandingPage from '../components/LandingSection';
import CustomerGallery from '../components/CustomerGallery';
import NewSignup from '../components/NewSignup';

function HomePage({ colorMode }) {
  return (
    <section>
      <LandingPage colorMode={colorMode} />
      <CustomerGallery />
      <NewSignup colorMode={colorMode} />
    </section>
  );
}

HomePage.propTypes = {
  // restrict to expected values; change if you use other strings
  colorMode: PropTypes.oneOf(['Light', 'Dark']),
};

HomePage.defaultProps = {
  colorMode: 'Light',
};

export default HomePage;
