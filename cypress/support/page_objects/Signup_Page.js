class SignupPageLocators {
    first_namebox() {
        return cy.xpath("//input[@name='firstName']")
    }
    last_namebox() {
        return cy.xpath("//input[@name='lastName']")
    }
    email_box() {
        return cy.xpath("//input[@name='email']")
    }
    phone() {
        return cy.xpath("//input[@name='phone']")
    }
    password() {
        return cy.xpath("//input[@name='password']")
    }
    signup_cta() {
        return cy.xpath("//button[@type='submit']")
    }
    first_name_errormsg() {
        return cy.xpath("//label[contains(text(),'First name is required.')]")
    }
    last_name_errormsg() {
        return cy.xpath("//label[contains(text(),'Last name is required.')]")
    }
    email_errormsg() {
        return cy.xpath("//label[contains(text(),'Please enter a valid email address.')]")
    }
    client_Selectionmodal_msg() {
        return cy.xpath("//h1[@class='onboarding-modal--question']")
    }
    client_Selectionmodal_option(){
        return cy.xpath("//div[@class='onboarding-modal--options']//button")
    }
    acct_selection_modal() {
        return cy.xpath("//div[@class='radio-container']//label//div[@class='radio d-flex']")
    }
    acct_selection_msg() {
        return cy.xpath("//div[@class='d-flex flex-column']")
    }
    acct_selection_option() {
        return cy.get("input[type='radio']")
    }
}
export default SignupPageLocators