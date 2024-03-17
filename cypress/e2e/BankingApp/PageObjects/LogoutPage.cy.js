/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class LogoutPage extends PageBase {
  logoutBtn() {
    return cy.get(".logout");
  }
  clickLogoutBtn() {
    this.click(this.logoutBtn());
  }
}

module.exports = { LogoutPage };
