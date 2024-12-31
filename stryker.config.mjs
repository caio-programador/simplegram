// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: "npm",
  reporters: ["html", "clear-text"],
  testRunner: "jest",
  testRunner_comment:
    "Take a look at https://stryker-mutator.io/docs/stryker-js/jest-runner for information about the jest plugin.",
  coverageAnalysis: "perTest",
  mutate: [
    "src/**/*.tsx", // Inclua arquivos que deseja testar
    "!src/**/*.cy.tsx",
    "!src/__test__/**",
    "!src/mocks/**", // Exclua a pasta 'mocks'
    "!src/utils/**", // Exclua a pasta 'utils' se necessário
    "!dist/**", // Exclua a pasta de build
    "!node_modules/**", // Exclua dependências externas
    "!src/main.tsx"
  ],
};
export default config;
