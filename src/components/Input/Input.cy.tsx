import Input from "."

describe("<Input/>", () => {
  const inputLabelProps = {
    id: 'teste',
    label: 'teste',
    type: 'text'
  }


  beforeEach(() => {
    cy.mount(<Input id={inputLabelProps.id} label={inputLabelProps.label} type={inputLabelProps.type}/>)  
  })

  it("should render the label correctly", () => {
    cy.contains(inputLabelProps.label).should('be.visible')
  })

  it("should render inputs correctly", () => {
    cy.get("#"+inputLabelProps.id).should('be.visible')
      .and('have.attr', 'type', inputLabelProps.type)
  })
})