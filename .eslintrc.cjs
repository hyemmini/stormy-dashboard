module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'import/prefer-default-export': 'off',

    // Import
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    'import/order': ['warn', { 'newlines-between': 'always' }],

    // React
    'react/react-in-jsx-scope': 'off', // React 18+
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/require-default-props': 'off',

    // Accessibility
    'jsx-a11y/label-has-associated-control': 'warn',
    'jsx-a11y/no-redundant-roles': 'warn',

    // General
    'no-console': 'warn',
    'no-plusplus': 'off',
    'no-else-return': 'off',
    'no-nested-ternary': 'off',

    // Prettier
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
