const { faker } = require("@faker-js/faker");
import HomePageLocators from "../page_objects/Home_Page";
import LoginPageLocators from "../page_objects/Login_Page";
import SignupPageLocators from "../page_objects/Signup_Page";


const login_page = new LoginPageLocators();
const signup_page = new SignupPageLocators();
const home_page = new HomePageLocators();


//Verify the login Page UI
export function loginPage_ui() {
    login_page.welcome_message().should("eq", "Welcome Back to Saleshandy")
    login_page.work_email_message().should("eq", "Work Email")
    login_page.password_message().should("eq", "Password")
    login_page.forgot_password().should('be.visible')
    login_page.sign_up().should('be.visible')
}

export function loginPage_visit() {
    login_page.sign_up().click()
    cy.title().should('eq', 'Sign up')
    cy.url().should('contain', 'signup')
}
export function forgotPasswordPage_visit() {
    login_page.forgot_password().click();
    cy.title().should("eq", "Reset Password")
    cy.url().should('contain', 'reset-password')
}
export function homePage_validation(){
    cy.fixture("credentials").then((data) => {
        try {
          login_page.emailbox().type(data.existing_email);
          login_page.passwordbox().type(data.password);
          login_page.login_button().click();
  
          home_page.profile_btn().click();
          home_page.profile_email().should("have.text", data.existing_email).then((text) => {
            if (text === data.email) {
              cy.log("Login Successful");
              console.log("Login Successful");
            } else {
              cy.log("Login Not Successful");
              console.log("Login Not Successful");
            }
          });
        } catch (error) {
          cy.log("An error occurred during login: ", error.message);
          console.error("An error occurred during login: ", error);
        }
      });
}