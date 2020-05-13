const clear = '{selectall}{backspace}';

describe('Test typing into text inputs', () => {
  before(() => {
    cy.visit('/test');
  });

  it('Can type into the text inputs', () => {
    cy.getCy('text-one')
      .type(clear + 'Apples');
    cy.getCy('text-two')
      .type(clear + 'bananas');
    cy.getCy('text-three')
      .type(clear + 'pears');
    
    cy.getCy('label')
      .contains('Apples, bananas and pears');
  });

  it('Does not show text if one or more inputs are empty', () => {
    cy.getCy('text-one')
      .type(clear + 'One');
    cy.getCy('text-two')
      .type(clear + 'Two');
    cy.getCy('text-three')
      .type(clear);

    cy.getCy('label')
      .should('be.empty');
      cy.getCy('text-one')
        .type(clear + 'One');
      cy.getCy('text-two')
        .type(clear);
      cy.getCy('text-three')
        .type(clear);
  
      cy.getCy('label')
        .should('be.empty');
  });
});