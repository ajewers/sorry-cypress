Cypress.Commands.add("getCy", (dataCyAttr) => { 
  return cy.get(`[data-cy=${dataCyAttr}]`);
});

