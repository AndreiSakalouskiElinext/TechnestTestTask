export class NavigationPage {
    navigateToHomePage() : this {
        cy.contains('Home').click();
        return this;
    }

    clickNewArticle() : this {
        cy.contains('New Article').click();
        return this;
    }
}
