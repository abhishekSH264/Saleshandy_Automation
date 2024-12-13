const { faker } = require("@faker-js/faker")
import { before } from "mocha"
import { loginPage_ui, loginPage_visit,forgotPasswordPage_visit,homePage_validation } from "../../support/src/login"
import HomePageLocators from "../../support/page_objects/Home_Page"
import LoginPageLocators from "../../support/page_objects/Login_Page"



const login_page = new LoginPageLocators()
const home_page = new HomePageLocators()
describe("Verify the Login Page", function () {
  beforeEach(function () {
    cy.visit("/");
  });
  it("Verify the UI elemenst of the Login Page", function () {
    loginPage_ui();
  })
  it("Verify User is navigating to sign_up page", function () {
    loginPage_visit();
  })
  it("Verify User is navigating to Forgot password Page", function () {
    forgotPasswordPage_visit();
  })
  it("Verify User is navigating to Home Page after Login", function () {
    homePage_validation();
  });
})
