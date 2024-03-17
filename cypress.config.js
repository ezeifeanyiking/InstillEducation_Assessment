const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: "cypress/e2e/BankingApp/allTests.spec.cy.js",
    watchForFileChanges: false,
    requestTimeout: 20000,
    pageLoadTimeout: 20000,
  },
});
