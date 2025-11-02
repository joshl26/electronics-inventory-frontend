module.exports = {
  env: { browser: true, es2021: true, jest: true },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    // adjust rules as needed
  },
  settings: { react: { version: 'detect' } },
  overrides: [
    {
      files: ['src/mocks/**', 'src/**/tests/**', 'src/**/?(*.)+(spec|test).js'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
