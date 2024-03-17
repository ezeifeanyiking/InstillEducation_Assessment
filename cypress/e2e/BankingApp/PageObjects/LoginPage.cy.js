/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class LoginPage extends PageBase {
  selectName() {
    return cy.get("#userSelect");
  }
  loginBtn() {
    return cy.get("form.ng-valid > .btn");
  }
  clickLoginBtn() {
    this.click(this.loginBtn());
  }
}

module.exports = { LoginPage };
