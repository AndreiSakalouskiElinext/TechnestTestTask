declare global {
    namespace Cypress {
        type Article = {
            title: string,
            description: string,
            body: string,
            tagList: string[],
        }

        interface Chainable {
            loginWithApi: () => void;
            createArticleWithApi: (article: Cypress.Article) => void;
            getAllArticlesWithApi: () => Promise<Cypress.Article[]>;
        }
    }
}

export function loginWithApi() {
    cy.fixture('credentials').then((credentials) => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3333/api/users/login',
                body: credentials,
            })
                .its('body').then(body => {
                expect(body.statusCode).to.equal(200);
                cy.wrap(body.data.token).as('accessToken');
            })
        }
    )
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
                }
            );
        }
    );
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
                }
            );
        }
    )
}

Cypress.Commands.add('loginWithApi', loginWithApi)
Cypress.Commands.add('createArticleWithApi', createArticleWithApi)
Cypress.Commands.add('getAllArticlesWithApi', getAllArticlesWithApi)
