/// <reference types="cypress" />
const { HomePage } = require("../PageObjects/HomePage.cy");
const { LoginPage } = require("../PageObjects/LoginPage.cy");
const { UserProfilePage } = require("../PageObjects/UserProfilePage.cy");
const { LogoutPage } = require("../PageObjects/LogoutPage.cy");

describe("Validate transactions", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const userProfilePage = new UserProfilePage();
  const logout = new LogoutPage();
  beforeEach(() => {
    cy.setViewportSize("Desktop");
    cy.visit(
      "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login"
    );
    cy.url().should("include", "login");
    homePage.clickCustomerLoginBtn();
    cy.fixture("data.json").then((data) => {
      loginPage.selectName().select(data.name);
    });
    loginPage.clickLoginBtn();
    userProfilePage.clickTransactionsBtn();
    // Wait for transactions to load
    userProfilePage.transactionRecords().should("have.length.greaterThan", 0);
  });

  context("Validating transactions", () => {
    it("should validate that a transaction for a given amount exists on a given day", () => {
      cy.fixture("validTransactions.json").then((data) => {
        const randomNumber = Math.floor(Math.random() * data.length);
        const desiredAmount = data[randomNumber].amount;
        const desiredDate = data[randomNumber].date;

        // Iterate through table rows to find the desired transaction
        cy.get("table tbody tr").each(($row) => {
          const amount = $row.find("td:nth-child(2)").text();
          const date = $row.find("td:nth-child(1)").text();
          if (amount === desiredAmount && date === desiredDate) {
            expect($row.text()).to.include(desiredAmount);
            expect($row.text()).to.include(desiredDate);
          }
        });
      });
    });

    it("should validate that a transaction for a given amount does not exist on a given day", () => {
      cy.fixture("invalidTransactions.json").then((data) => {
        const randomNumber = Math.floor(Math.random() * data.length);
        const desiredAmount = data[randomNumber].amount;
        const desiredDate = data[randomNumber].date;

        // Iterate through table rows to ensure the desired transaction doesn't exist
        cy.get("table tbody tr").each(($row) => {
          const amount = $row.find("td:nth-child(2)").text();
          const date = $row.find("td:nth-child(1)").text();
          if (amount === desiredAmount && date === desiredDate) {
            expect($row.text()).to.not.include(desiredAmount);
            expect($row.text()).to.not.include(desiredDate);
          }
        });
      });
    });
  });

  after(() => {
    logout.logoutBtn().click();
    cy.url().should("not.include", "/login");
  });
});
