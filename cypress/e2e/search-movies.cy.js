it('shows movies that I searched for in a list', () => {
  cy.visit('/');

  cy.findByRole('textbox', { name: /search/i }).type('godfather');
  cy.findByRole('button', { name: /search/i }).click();

  cy.findAllByRole('listitem').then(items => {
    const [itemOne, itemTwo, itemThree] = items;

    expect(itemOne).to.contain.text('The Godfather');
    expect(itemTwo).to.contain.text('The Godfather Part II');
    expect(itemThree).to.contain.text('The Godfather Part III');
  });
});
