class HomePageLocators {
    profile_btn() {
        return cy.xpath("//div[@class='d-flex align-items-center pointer']")
    }
    profile_email() {
        return cy.xpath("//p[@class='user-label-email']")
    }
}

export default HomePageLocators