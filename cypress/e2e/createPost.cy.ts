import IPost from "../../src/interfaces/Post"

describe("CreatePost Page", () => {
  const post: IPost = {
    title: 'Post de test',
    imageURL: 'https://static.todamateria.com.br/upload/pl/an/planetaterra-cke.jpg',
    description: 'Teste de descrição sobre a vida'
  }
  beforeEach(() => {
    cy.intercept('POST', 'api/v1/posts', {statusCode: 201}).as("getAllPosts")
    cy.visit("/")
    cy.get('[href="/posts/create"]').click()
  })

  it("should have the active class link", () => {
    cy.get('[href="/posts/create"]').should("have.class", 'active')
  })

  it("should show de create post page", () => {
    cy.contains('Crie seu post').should("be.visible")
    cy.get("form").should('be.visible')
  })

  it("should have all labels and buttons", () => {
    cy.contains('Título:').should('be.visible')
    cy.contains('Link da imagem:').should('be.visible')
    cy.contains('Descrição:').should('be.visible')
    cy.get(".btn").should("be.visible")
  })

  it("should submit form with valid values and return to home page", () => {
    cy.contains('Título:').type(post.title)
    cy.contains('Link da imagem:').type(post.imageURL)
    cy.contains('Descrição:').type(post.description)
    
    cy.get(".btn").click()

    cy.contains("Veja os melhores posts dos mais diversos assuntos").should("be.visible")
  })

  it("should show error for invalid image link", () => {
    cy.get("#title").type(post.title)
    cy.get("#imageUrl").type("post.imageURL", {delay: 0})
    cy.get("#description").type(post.description)

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

  it("should show min length error for title and description", () => {
    cy.get("#title").type("a")
    cy.get("#imageUrl").type(post.imageURL, {delay: 0})
    cy.get("#description").type("a")
    
    cy.get(".btn").click()

    cy.get("[data-testid='error_form']").should("be.visible").and('have.length', 2)

    cy.contains("O título precisa ter no mínimo 3 caracteres").should("be.visible")
    cy.contains("A descrição precisa ter no mínimo 3 caracteres").should("be.visible")
  })

})