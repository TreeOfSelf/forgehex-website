module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-tailwindcss',
  ],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
  },
  ignoreFiles: ['node_modules/**', '.nuxt/**', 'dist/**'],
};
