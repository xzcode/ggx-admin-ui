module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/standard"],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'warn',
    'eqeqeq': 'warn'
  },

  extends: [
    "plugin:vue/essential",
    "@vue/standard",
    "eslint:recommended",
    "@vue/prettier"
  ],

  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    'eslint:recommended',
    '@vue/prettier'
  ]
};
