import Form from "."
import IPost from "../../interfaces/Post"

describe("<Form/>", () => {
  const mockPost: IPost = {
      title: "Post 1",
      imageURL: "https://static.todamateria.com.br/upload/pl/an/planeta-terra-og.jpg",
      description: "Teste"
    }
  
  beforeEach(() => {
    cy.mount(<Form handleForm={() => {}} isPending={false}/>)
  })

  it("should render form correctly", () => {
    cy.contains("Título").should("be.visible")
    cy.contains("Link da image").should("be.visible")
    cy.contains("Descrição").should("be.visible")

    cy.get(".btn").should("be.visible")

    cy.get("#title").should('be.visible')
    cy.get("#imageUrl").should('be.visible')
    cy.get("#description").should('be.visible')
  })

  it("should type correctly data", () => {
    cy.get("#title").type(mockPost.title)
    cy.get("#imageUrl").type(mockPost.imageURL, {delay: 0})
    cy.get("#description").type(mockPost.description)

    cy.get(".btn").click()
  })

  it("should show error for invalid image link", () => {
    cy.get("#title").type(mockPost.title)
    cy.get("#imageUrl").type("mockPost.imageURL", {delay: 0})
    cy.get("#description").type(mockPost.description)

    cy.get(".btn").click()

    cy.contains("Por favor, insira um link válido para uma imagem!").should("be.visible")
  })

  it("should show required error for empty values", () => {
    cy.get(".btn").click()

    cy.get("[data-testid='error_form']").should("have.length", 3)

    cy.contains("O título é obrigatório").should("be.visible")
    cy.contains("O link da imagem é obrigatório").should("be.visible")
    cy.contains("A descrição é obrigatória").should("be.visible")
  })

  it("should show minLength error for title and description", () => {
    cy.get("#title").type("a")
    cy.get("#imageUrl").type(mockPost.imageURL, {delay: 0})
    cy.get("#description").type("a")
    
    cy.get(".btn").click()

    cy.get("[data-testid='error_form']").should("be.visible").and('have.length', 2)

    cy.contains("O título precisa ter no mínimo 3 caracteres").should("be.visible")
    cy.contains("A descrição precisa ter no mínimo 3 caracteres").should("be.visible")
  })

  it("should disable button and change to 'Aguarde'", () => {
    
    cy.mount(<Form handleForm={() => {}} isPending={true}/>)

    cy.contains("Aguarde").should("be.visible").and('have.attr','disabled')
  })

  it("should show maxLength error for title", () => {
    cy.get("#title").type("a".repeat(101), {delay: 0})
    cy.get("#imageUrl").type(mockPost.imageURL, {delay: 0})
    cy.get("#description").type(mockPost.description)

    cy.get(".btn").click()

    cy.get("[data-testid='error_form']").should("be.visible").and('have.length', 1)
    cy.contains("O título só pode ter no máximo 100 caracteres").should("be.visible")

  })
})