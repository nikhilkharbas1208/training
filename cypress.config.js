const { defineConfig } = require("cypress");
const { JIRA_EMAIL, JIRA_API_TOKEN } = require("./src/constants/UrlConstants");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
   
  
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
