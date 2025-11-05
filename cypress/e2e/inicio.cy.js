describe('Página principal', function () {
    it('debe mostrar el título correcto', function () {
        cy.visit('http://localhost:5173');
        cy.contains('Bienvenido').should('be.visible');
    });
});
