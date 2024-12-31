import { MemoryRouter } from "react-router"
import Navbar from "."

describe("<Navbar />", () => {
  beforeEach(() => {
    cy.mount(<MemoryRouter>
      <Navbar/>
    </MemoryRouter>)
  })

  it("should render the navbar with logo and links", () => {
    cy.contains("SimpleGram").should("be.visible")
    cy.contains("Home").should("be.visible")
    cy.contains("Sobre").should("be.visible")
    cy.contains("Postar").should("be.visible")
  })

  it("should have correct urls", () => {
    cy.contains("SimpleGram").should("have.attr", "href", "/")
    cy.contains("Home").should("have.attr", "href", "/")
    cy.contains("Sobre").should("have.attr", "href", "/about")
    cy.contains("Postar").should("have.attr", "href", "/posts/create")
  })

  it("should have active class when clicked and not have active class when is not clicked", () => {
    cy.contains("Home").click().should('have.class', 'active')
    cy.contains("Sobre").should('not.have.class', 'active')
    cy.contains("Postar").should('not.have.class', 'active')

    cy.contains("Sobre").click().should('have.class', 'active')
    cy.contains("Home").should('not.have.class', 'active')
    cy.contains("Postar").should('not.have.class', 'active')
    
    cy.contains("Postar").click().should('have.class', 'active')
    cy.contains("Home").should('not.have.class', 'active')
    cy.contains("Sobre").should('not.have.class', 'active')
  })
})