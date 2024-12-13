const { faker } = require("@faker-js/faker");
import HomePageLocators from "../page_objects/Home_Page";
import LoginPageLocators from "../page_objects/Login_Page";
import SignupPageLocators from "../page_objects/Signup_Page";

const login_page = new LoginPageLocators();
const signup_page = new SignupPageLocators();
const home_page = new HomePageLocators();



// Verify the navigation to signup page
export function signup_landing() {
  login_page.sign_up().click();
  cy.title().should("eq", "Sign up");
  cy.url().should("contain", "signup");
}



//Verify the Error Messages of the input Boxes
export function signup_error_msg() {
  try {
    signup_landing(); // Use signup_landing here to navigate to the page

    //checking first name error message
    signup_page.first_namebox().click();
    cy.get("body").click(); // Click outside to trigger validation
    const firstNameError = signup_page.first_name_errormsg();
    firstNameError.should("exist").and('be.visible');
    if (firstNameError.should('have.text', 'First name is required.')) {
      cy.log("First Name Error message is correct");
    } else {
      cy.log("First Name Error Message is incorrect")
    }
    //checking the last name error message
    signup_page.last_namebox().click();
    cy.get("body").click(); // Click outside to trigger validation
    const lastNamerError = signup_page.last_name_errormsg();
    lastNamerError.should("exist").and('be.visible');
    if (lastNamerError.should('have.text', 'Last name is required.')) {
      cy.log("Last Name Error message is correct");
    } else {
      cy.log("Last Name Error Message is incorrect")
    }

    //checking the email address error message
    signup_page.email_box().click();
    cy.get("body").click(); // Click outside to trigger validation
    const emailboxError = signup_page.email_errormsg();
    emailboxError.should("exist").and('be.visible');
    if (emailboxError.should('have.text', 'Please enter a valid email address.')) {
      cy.log("Email address Error message is correct");
    } else {
      cy.log("Email address Error Message is incorrect")
    }
  } catch (error) {
    cy.log("An error occurred during the test: ", error.message);
    // You can fail the test manually if needed
    throw new Error("Test failed due to an error: " + error.message);
  }
}

//verify the user Signup
export function user_signup() {
  try {

    //load the data from the fixtures
    cy.fixture("credentials").then((data) => {
      signup_landing();
      const FirstName = faker.person.firstName()
      const LastName = data.last_name
      const randomNum = Math.floor(Math.random() * 10000); // Generate a random number
      const Email = `${data.email.split('@')[0]}+${randomNum}@${data.email.split('@')[1]}`; // Append random number to email
      const Phone_num = faker.phone.number("##########")


      cy.wrap(Email).as("userEmail");

      signup_page.first_namebox().type(FirstName);
      signup_page.last_namebox().type(LastName);
      signup_page.email_box().type(Email);
      signup_page.phone().type(Phone_num);
      signup_page.password().type(data.password);
      signup_page.signup_cta().click();
      cy.url({ timeout: 50000 }).should('exist').and('include', 'signup=completed');
      //return Email
    })
  } catch (error) {
    cy.log("An error occurred during the test: ", error.message);
    throw new Error("Test failed due to an error: " + error.message);
  }
}


export function client_user_signup() {
  user_signup(); // Function for completing the signup process

  // Verifying the Welcome Message
  const act_msg = signup_page.acct_selection_msg();
  act_msg
    .should('exist')
    .and('be.visible')
    .and('contain.text', 'Let’s shape your experience')
    .and('contain.text', 'Whom you are going to use it for?')
    .then(() => {
      cy.log('Welcome message is displayed');
    });

  // Verifying the Account Selection Modal and UI Components
  const actSelection = signup_page.acct_selection_modal();
  actSelection.each(($el) => {
    const mainText = 'Clients';
    const subText = 'I want to outreach for my clients';
    const trimmedMainText = $el.find('.semibold-2').text().trim();
    expect(['Clients', 'Business', 'Personal Use']).to.include(trimmedMainText);

    const trimmedSubText = $el.find('.regular-2').text().trim();
    expect([
      'I want to outreach for my clients',
      'I want to grow my business using cold emails',
      'I want to do cold emailing for personal use',
    ]).to.include(trimmedSubText);

    if (trimmedMainText === mainText) {
      cy.wrap($el).find("input[type='radio']").should('exist').check({ force: true });
    }
  });

  // Verifying Modals and Clicking Random Options
  const modals = [
    {
      heading: 'What type of agency are you?',
      expectedOptions: [
        'Lead Generation Agency',
        'Sales Agency',
        'Digital Marketing Agency',
        'Social Media Agency',
        'Recruitment Agency',
        'Other',
      ],
    },
    {
      heading: 'How many clients do you serve?',
      expectedOptions: ['0 - 5', '6 - 20', '21 - 50', 'More than 50'],
    },
    {
      heading: 'How many emails are you likely to send every month?',
      expectedOptions: [
        '0 - 30K',
        '30K - 100K',
        '100K - 250K',
        'More than 250K',
      ],
    },
    {
      heading: 'How did you find us?',
      expectedOptions: [
        'LinkedIn',
        'Blog',
        'Google',
        'Ads',
        'YouTube',
        'Recommendation',
      ],
    },
  ];
  modals.forEach((modal) => {

    // Verify the heading of the modal
    signup_page.client_Selectionmodal_msg()
      .should('exist')
      .and('be.visible')
      .and('contain.text', modal.heading)
      .then(($el) => {
        cy.log(`Verified heading: ${$el.text().trim()}`);
      });

    // Verify the options and select a random one
    signup_page.client_Selectionmodal_option().then(($buttons) => {
      // Verify the button names
      const actualOptions = Array.from($buttons).map((btn) =>
        Cypress.$(btn).text().trim()
      );
      cy.log('Captured Options:', actualOptions); // Debugging log
      expect(actualOptions).to.deep.equal(modal.expectedOptions);

      // Log the options
      actualOptions.forEach((option, i) => {
        cy.log(`Option ${i + 1}: ${option}`);
      });

      // Select a random button
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons[randomIndex]).click();

      cy.log(`Clicked on: ${actualOptions[randomIndex]}`);
    });
  });
  home_page.profile_btn().click();
  cy.get('@userEmail').then((email) => {
    home_page.profile_email().should('have.text', email);
  });
}
















































// home_page.profile_btn().click();

// const signup_email = home_page.profile_email();
// signup_email.should("exist").and('be.visible');
// if (signup_email.should('have.text', Email)) {
//   cy.log("Signup is successfull");
// }else{
//   cy.log("Signup is not successfull")
// }