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

  it("should submit form with valid values", () => {
    cy.contains('Título:').type(post.title)
    cy.contains('Link da imagem:').type(post.imageURL)
    cy.contains('Descrição:').type(post.description)
    
    cy.get(".btn").click()
  })

  it("should submit form with invalid values and show error", () => {
    cy.clock()

    cy.contains('Título:').type(post.title)
    cy.contains('Link da imagem:').type('sad')
    cy.contains('Descrição:').type(post.description)

    cy.get(".btn").click()

    cy.get(".error").should("be.visible")
    cy.tick(2000)

  })

})