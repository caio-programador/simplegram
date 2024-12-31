import App from './App'



describe('<App />', () => {
  it('renders', () => {
    
    cy.mount(<App />)

    cy.contains('SimpleGram').should("be.visible")
    cy.contains('Todos os direitos reservados').should('be.visible')
    cy.get("nav").should("be.visible")
  })
})