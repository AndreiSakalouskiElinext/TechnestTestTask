import {NavigationPage} from "./navigation.page";

export class NewArticlePage extends  NavigationPage{
    private get articleName() : Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[name = title]'); }
    private get articleDescription() : Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[name = description]'); }
    private get articleBody() : Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[name = body]'); }
    private get articleTags() : Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[name = tagList]'); }
    private get publishArticleButton() : Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('[type= submit]'); }
    private get closePopupButton() : Cypress.Chainable<JQuery<HTMLElement>> { return cy.get('div.close-button'); }

    createNewArticle(article: Cypress.Article) : void {
        this.articleName.type(article.title);
        this.articleDescription.type(article.description);
        this.articleBody.type(article.body);
        this.articleTags.type(article.tagList.toString());
        this.publishArticleButton.click();
        this.closePopupButton.click();
    }
}

export const newArticlesPage = new NewArticlePage();
