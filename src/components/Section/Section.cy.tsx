import Section from "."

describe("<Section />", () => {
  const mockContent = {
    title:"Test", 
    children: "Teste teste teste teste teste teste teste teste teste teste"
  }
  beforeEach(() => {
    cy.mount(
      <Section title={mockContent.title}>
        {mockContent.children}
      </Section>
    )
  })
  it("should render the title", () => {
    cy.contains(mockContent.title).should("be.visible")
  })

  it("should render the children", () => {
    cy.contains(mockContent.children).should("be.visible")
  })
})