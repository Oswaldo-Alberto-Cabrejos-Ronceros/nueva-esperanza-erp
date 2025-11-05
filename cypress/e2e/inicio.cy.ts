describe('Página principal', () => {
  it('debe mostrar el título correcto', () => {
    cy.visit('http://localhost:5173') 
    cy.contains('Bienvenido').should('be.visible')
  })
})
