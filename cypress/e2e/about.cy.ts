describe("About Page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[href="/about"]').click()
  })

  it("should have the active class link", () => {
    cy.get('[href="/about"]').should('have.class', 'active')
  })

  it("should click at about link and show de about page", () => {
    cy.contains("Quem somos?").should("be.visible")
  })


  it("should show 3 values at the about page", () => {
    cy.get('._value_18kf5_11').should('have.length', 3)
  })

})