import {HomePage} from "./home.page";
import {NavigationPage} from "./navigation.page";

export class GlobalFeedPage extends NavigationPage {

    private get rightArrow(): Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[aria-label = Next]'); }

    verifyNumberOfArticles(expectedNumberOfArticles): void {
        cy.wrap({numberOfArticles: 0}).as('numberOfArticles')
            .wrap(this.countNumberOfArticles())
            .get('@numberOfArticles')
            .its('numberOfArticles')
            .then((numberOfArticles) => expect(numberOfArticles).to.equal(expectedNumberOfArticles))
    }

    // @ts-ignore
    private countNumberOfArticles(): number {
        this.rightArrow.then((rightArrow) => {
            cy.get('div.article-preview')
                .its('length')
                .then(length => {
                    cy.get('@numberOfArticles')
                        .its('numberOfArticles')
                        .then((numberOfArticles) => cy.wrap({numberOfArticles: numberOfArticles + length}).as('numberOfArticles'))
                })
                .then(() => {
                    if (!rightArrow.attr('aria-disabled')) {
                        this.rightArrow.click();
                        cy.wait(500);
                        this.countNumberOfArticles();
                    }
                });
        });
    }
}

export const globalFeedPage = new GlobalFeedPage();
