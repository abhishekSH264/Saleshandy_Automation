// Adjust the relative import path based on your file structure
import { signup_landing, signup_error_msg, user_signup, client_user_signup } from "../../support/src/signup";


describe("Verify the Sign-up page functionality", function () {
  beforeEach(function () {
    cy.visit("/"); // Ensure you're visiting the correct page before each test
  });

  it("Verify user is landing on the signup page", function () {
    signup_landing(); // This will verify landing on the signup page
  });

  it("verify ui elements of signup page", function () {
    signup_error_msg(); //Function to check the Error Messages on the Signup page
  });
  it("verify user is able to complete the signup", function () {
    user_signup(); //Function to check the Error Messages on the Signup page
  });
  it("verify user is able to complete the signup as a client user", function () {
    client_user_signup(); //Funtion for signup as a client.
  });
});
