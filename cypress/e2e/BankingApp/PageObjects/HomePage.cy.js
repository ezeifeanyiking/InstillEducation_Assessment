/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class HomePage extends PageBase {
  customerLoginBtn() {
    return cy.get(".borderM > :nth-child(1) > .btn");
  }
  managersLoginBtn() {
    return cy.get(":nth-child(3) > .btn");
  }
  clickCustomerLoginBtn() {
    this.click(this.customerLoginBtn());
  }
  clickManagersLoginBtn() {
    this.click(this.managersLoginBtn());
  }
}

module.exports = { HomePage };
