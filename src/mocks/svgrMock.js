// src/mocks/svgrMock.js
const React = require('react');
const PropTypes = require('prop-types');

function SvgMock(props) {
  const { title = 'svg-mock', ...rest } = props;
  const elementProps = { 'data-testid': 'svg-mock', ...rest };
  return React.createElement('svg', elementProps, String(title));
}

SvgMock.propTypes = {
  title: PropTypes.node,
};

SvgMock.defaultProps = {
  title: 'svg-mock',
};

module.exports = {
  __esModule: true,
  default: SvgMock,
};
