import About from "."

describe('<About />', () => {

  beforeEach(() => {
    cy.mount(<About />)
  })

  it('renders', () => {

    cy.contains("Quem somos?").should("be.visible")
  })

  it("should have 2 section in the page", () => {
    cy.get('._section_8314o_1').should('have.length', 2)
  })

  it('should have 3 values at the section value', () => {
    cy.get('._value_18kf5_11').should('have.length', 3)
  })

})