import AUTWindow = Cypress.AUTWindow;

declare global {
    namespace Cypress {
        type Article = {
            title: string,
            description: string,
            body: string,
            tagList: string[],
            slug?: string
        }

        interface Chainable {
            loginWithApi: () => void;
            createTestUser: () => void;
            createArticleWithApi: (article: Cypress.Article) => void;
            getAllArticlesWithApi: () => Promise<Cypress.Article[]>;
            deleteAllArticlesWithApi: () => void;
        }
    }
}

export function loginWithApi() {
    cy.fixture('credentials').then((credentials) => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/api/users/login',
            body: credentials,
            failOnStatusCode: false
        }).its('body').then(body => {
            if (body.statusCode == 404) {
                cy.createTestUser();
                cy.loginWithApi();
                return;
            }
            expect(body.statusCode).to.equal(200);
            cy.wrap(body.data.token).as('accessToken');
            cy.visit('/', {
                onBeforeLoad(window: AUTWindow) {
                    window.localStorage.setItem('userInfo', JSON.stringify(body.data));
                }
            });
        });
    });
}

export function createTestUser() {
    cy.fixture('credentials').then((credentials) => {
        cy.request('POST', 'http://localhost:3333/api/users', credentials)
            .then(response => {
                expect(response.body.statusCode).to.equal(200);
            });
    });
}

export function createArticleWithApi(article: Cypress.Article) {
    cy.get('@accessToken').then((token) => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/api/articles',
            headers: {'Authorization': `Bearer ${token}`},
            body: article
        }).then((response) => {
            expect(response.body.statusCode).to.equal(200);
        });
    });
}

// @ts-ignore
export function getAllArticlesWithApi(): Promise<Cypress.Article[]> {
    cy.get('@accessToken').then((token) => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3333/api/articles',
            headers: {'Authorization': `Bearer ${token}`},
        }).then((response) => {
            expect(response.body.statusCode).to.equal(200);
            return response.body.listData;
        });
    });
}

export function deleteAllArticlesWithApi() {
    cy.get('@accessToken').then((token) => {
        cy.getAllArticlesWithApi().then((articles) => {
            articles.forEach(article => {
                cy.request({
                    method: 'DELETE',
                    url: `http://localhost:3333/api/articles/${article.slug}`,
                    headers: {'Authorization': `Bearer ${token}`},
                }).then((response) => {
                    expect(response.body.statusCode).to.equal(200);
                });
            });
        });
    });
}

Cypress.Commands.add('loginWithApi', loginWithApi)
Cypress.Commands.add('createTestUser', createTestUser)
Cypress.Commands.add('createArticleWithApi', createArticleWithApi)
Cypress.Commands.add('getAllArticlesWithApi', getAllArticlesWithApi)
Cypress.Commands.add('deleteAllArticlesWithApi', deleteAllArticlesWithApi)
