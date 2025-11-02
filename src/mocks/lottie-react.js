// __mocks__/lottie-react.js
const React = require('react');

function LottieMock(props) {
  return React.createElement('div', { 'data-testid': 'lottie-mock', ...props });
}
module.exports = {
  __esModule: true,
  default: LottieMock,
};
