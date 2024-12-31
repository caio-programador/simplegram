import Loading from "."

describe("<Loading/>", () => {
  it("should render loading correctly", () => {
    cy.mount(<Loading/>)

    cy.get('div').should('be.visible')
    cy.get('img').should('be.visible')
  })
})