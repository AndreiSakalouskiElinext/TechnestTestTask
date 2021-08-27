import {NavigationPage} from "./navigation.page";
import {GlobalFeedPage} from "./global-feed.page";

export class HomePage extends NavigationPage{
    private get globalFeedLink() : Cypress.Chainable<JQuery<HTMLElement>> { return cy.contains('Global Feed'); }

    openGlobalFeed() : GlobalFeedPage {
        this.globalFeedLink.click();
        return new GlobalFeedPage();
    }
}

export const homePage = new HomePage();
