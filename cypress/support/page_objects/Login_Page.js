class LoginPageLocators
{
    emailbox()
    {
        return cy.xpath("//input[@name='email']")
    }
    passwordbox()
    {
        return cy.xpath("//input[@name='password']")
    }
    login_button()
    {
        return cy.xpath("//button[@type='submit']")
    }
    sign_up()
        {
            return cy.xpath("//a[text()='Sign up!']")
        }
    forgot_password(){
        return cy.xpath("//a[text()='Forgot Password?']")
    }
    welcome_message()
    {
        return cy.xpath("//h1[@class='auth-container--title']/span").invoke('text')
    }
    work_email_message()
    {
        return cy.xpath("//label[contains(text(),'Work Email')]").invoke('text')
    }
    password_message()
    {
        return cy.xpath("//label[contains(text(),'Password')]").invoke('text')
    }
    // signup_message()
    // {
    //     return cy.xpath
    // }
}
export default LoginPageLocators