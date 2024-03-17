/// <reference types="cypress" />

const { PageBase } = require("./PageBase.cy");

class UserProfilePage extends PageBase {
  transactionsBtn() {
    return cy.get('[ng-class="btnClass1"]');
  }
  transactionRecords() {
    return cy.get("table tbody tr");
  }
  clickTransactionsBtn() {
    this.click(this.transactionsBtn());
  }
}

module.exports = { UserProfilePage };
