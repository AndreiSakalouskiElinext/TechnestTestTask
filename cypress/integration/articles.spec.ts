import {homePage} from "../support/page-objects/home.page";
import {globalFeedPage} from "../support/page-objects/global-feed.page";
import {newArticlesPage} from "../support/page-objects/new-article.page";

describe('Creating articles feature', () => {
    beforeEach('Log in to the application', () => {
        cy.loginWithApi();
    });

    it('Creates articles and verifies their number with API', () => {
        cy.fixture('articles').then((articlesArrayFromFixtures) => {
            articlesArrayFromFixtures.forEach((article) => {
                cy.createArticleWithApi(article)
            });
            cy.getAllArticlesWithApi().then((articlesArrayFromApp) => {
                expect(articlesArrayFromApp.length).to.equal(articlesArrayFromFixtures.length);
            });
        });
    });

    it('Creates articles and verifies their number with UI', () => {
        cy.fixture('articles').then((articlesArrayFromFixtures) => {
            articlesArrayFromFixtures.forEach((article) => {
                newArticlesPage.clickNewArticle()
                    .createNewArticle(article);
            });
            homePage.navigateToHomePage()
                .openGlobalFeed()
                .verifyNumberOfArticles(articlesArrayFromFixtures.length);
        });
    });

    afterEach('Deletes all the articles', () => {
        cy.deleteAllArticlesWithApi();
    });
});
