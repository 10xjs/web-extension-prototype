module.exports = {
  extends: ['metalab', 'metalab/react'],
  rules: {
    complexity: 0,
    indent: 0,
    'max-len': 0,
    'jsx-quotes': [2, prefer - double],
    'metalab/flowtype/space-after-type-colon': 0,
    'metalab/react/prefer-stateless-function': 0,
    'no-nested-ternary': 0,
  },
  overrides: [
    {
      files: '*.test.js',
      env: {
        jest: true,
      },
    },
  ],
  globals: [
    {
      __DEV__: false,
      module: false,
    },
  ],
};
