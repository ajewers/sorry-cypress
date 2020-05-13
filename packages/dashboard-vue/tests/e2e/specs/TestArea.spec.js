const clear = '{selectall}{backspace}';

describe('Load the Test Area page', () => {
  before(() => {
    cy.visit('/test');
  });

  describe('Correct page elements', () => {
    it('Has the correct URL', () => {
      cy.url()
        .should('include', '/test');
    });

    it('Has the text inputs', () => {
      cy.getCy('text-one');
      cy.getCy('text-two');
      cy.getCy('text-three');
    });

    it('Has the label', () => {
      cy.getCy('label');
    });

    it('Has the card toggle buttons', () => {
      cy.getCy('button-show');
      cy.getCy('button-hide')
        .should('not.exist');
    });

    it('Has the count buttons', () => {
      cy.getCy('button-one');
      cy.getCy('button-ten');
      cy.getCy('button-one-hundred');
      cy.getCy('button-one-thousand');
      cy.getCy('button-ten-thousand');
    });
  });

  describe('Correct navbar elements', () => {
    it('Has the navbar structure', () => {
      cy.getCy('navbar-container');
    });

    it('Has the navbar options', () => {
      cy.getCy('nav-link-runs');
      cy.getCy('nav-link-test-area')
        .should('have.class', 'router-link-exact-active');
    });
  });
});