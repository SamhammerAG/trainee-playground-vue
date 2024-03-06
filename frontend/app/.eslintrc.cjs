/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vuetify/recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "./.eslintsag.cjs",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  }
};
