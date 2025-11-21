module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    moduleNameMapper: {
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^app/(.*)$': '<rootDir>/src/app/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        // Add other aliases as needed
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // for CSS/SCSS imports
        
        // Use a regex string without slashes and escape dots
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^img/(.*)$': '<rootDir>/src/img/$1',
    '^svg/(.*)$': '<rootDir>/src/svg/$1',
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  };