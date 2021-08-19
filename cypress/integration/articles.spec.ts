import {deleteAllArticlesWithApi} from "../support/commands";

describe('Creating articles feature', () => {
    beforeEach('Log in to the application', () => {
        cy.loginWithApi();
    })

    it('Creates articles and verifies their number', () => {
        cy.fixture('articles').then((articlesArrayFromFixtures) => {
            articlesArrayFromFixtures.forEach((article) => {
                cy.createArticleWithApi(article)
            })
            cy.getAllArticlesWithApi().then((articlesArrayFromApp) => {
                expect(articlesArrayFromApp.length).to.equal(articlesArrayFromFixtures.length);
            });
        });
    })

    after('Deletes all the articles', () => {
        cy.deleteAllArticlesWithApi();
    })
})
