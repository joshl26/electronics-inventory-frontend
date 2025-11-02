// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',

  // Only run tests inside src
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).{js,jsx,mjs,cjs}'],

  // Run early env polyfills BEFORE any module is imported
  setupFiles: ['<rootDir>/src/setupEnv.js'],
  // Keep MSW lifecycle and other test setup in setupTests
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  transform: {
    '^.+\\.(js|jsx|mjs|cjs)$': 'babel-jest',
  },

  // Allow Babel to transform msw and its ESM deps inside node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(msw|@mswjs/interceptors|until-async|web-streams-polyfill)/)',
  ],

  moduleFileExtensions: ['js', 'jsx', 'json', 'mjs', 'cjs', 'node'],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|avif|ico|bmp)$': '<rootDir>/src/mocks/fileMock.js',
    '\\.(woff|woff2|eot|ttf|otf)$': '<rootDir>/src/mocks/fileMock.js',
    '^.+\\.svg$': '<rootDir>/src/mocks/svgrMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lottie-react$': '<rootDir>/src/mocks/lottie-react.js',
  },

  // Ignore e2e-tests from unit test runs
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e-tests/'],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.story.{js,jsx}', '!src/index.js'],
};
