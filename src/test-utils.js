import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
/* eslint-enable import/no-extraneous-dependencies */
import store from './app/store';

function AllTheProviders({ children, route }) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </Provider>
  );
}

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string,
};

AllTheProviders.defaultProps = {
  route: '/',
};

const customRender = (ui, { route, wrapper: userWrapper, ...options } = {}) => {
  function Wrapper({ children }) {
    return <AllTheProviders route={route}>{children}</AllTheProviders>;
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return render(ui, {
    wrapper: userWrapper || Wrapper,
    ...options,
  });
};

/* eslint-disable import/no-extraneous-dependencies */
export * from '@testing-library/react';
export { customRender as render };
/* eslint-enable import/no-extraneous-dependencies */
