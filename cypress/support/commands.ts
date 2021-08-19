declare global {
    namespace Cypress {

        interface Chainable {
            loginWithApi: () => void;
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
            })
        }
    )
}

Cypress.Commands.add('loginWithApi', loginWithApi)
