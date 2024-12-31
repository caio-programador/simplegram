import Message from "."

describe("<Message/>", () => {
  const msg = 'Teste'

  it("should have success class when set 'typeMsg' to 'success'",() => {
    cy.mount(<Message msg={msg} typeMsg={"success"} />)
    cy.get('.message').should('have.class', 'success')
  })

  it("should have error class when set 'typeMsg' to 'error'",() => {
    cy.mount(<Message msg={msg} typeMsg={"error"} />)
    cy.get('.message').should('have.class', 'error')
  })
})