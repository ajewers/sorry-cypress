describe('Test clicking on the buttons', () => {
  before(() => {
    cy.visit('/test');
  });

  it('Can click on the buttons', () => {
    cy.getCy('count')
      .as('count')
      .contains('0');

    cy.getCy('button-one')
      .click();

    cy.getCy('count')
      .contains('1');

    cy.getCy('button-ten')
      .click();

    cy.getCy('count')
      .contains('11');

    cy.getCy('button-one-hundred')
      .click();

    cy.getCy('count')
      .contains('111');

    cy.getCy('button-one-thousand')
      .click();

    cy.getCy('count')
      .contains('1111');

    cy.getCy('button-ten-thousand')
      .click();

    cy.getCy('count')
      .contains('11111');
  });

  it('Can show hide the card', () => {
    cy.getCy('button-show')
      .click();

    cy.getCy('card');
  });
});