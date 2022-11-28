it('shows the movie I searched for in a list', () => {
  cy.visit('/');

  cy.findByRole('textbox', { name: /search/i }).type('battleship potemkin');
  const submitButton = cy.findByRole('button', { name: /search/i });

  submitButton.click();

  submitButton.should('have.text', 'Searching ...');

  cy.findByRole('listitem').should('contain.text', 'Battleship Potemkin');
});
