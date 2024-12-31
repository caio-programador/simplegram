describe("Home Page", () => {
  const mockedPosts = [
    {
      id: "1",
      title: 'Post 1',
      imageURL: 'https://static.todamateria.com.br/upload/pl/an/planeta-terra-og.jpg?class=ogImageWide',
      description: 'Teste'
    },
    {
      id: "2",
      title: 'Post 2',
      imageURL: 'https://static.todamateria.com.br/upload/pl/an/planeta-terra-og.jpg?class=ogImageWide',
      description: 'Teste'
    },
    
  ]
  beforeEach(() => {
    cy.intercept('GET', '/posts', {statusCode: 200, body: mockedPosts}).as("getAllPosts")
    cy.visit("/")
  })

  it("should have a logo and navbar", () => {
    cy.get('[href="/"]').should('be.visible')
    cy.get('[href="/about"]').should('be.visible')
    cy.get('[href="/posts/create"]').should('be.visible')

    cy.get('._logo_1hlt4_19 > a').should('be.visible')
  })

  it("should habe at least one post", () => {
    cy.get('._post_vqv34_1').should('have.length.at.least', 1)
  })

  it("should click a post and show more details", () => {
    cy.intercept('GET', '/posts/1', {statusCode: 200, body: mockedPosts[0]}).as("getOnePost")
    cy.get(':nth-child(1) > .btn').click()

    cy.get('h2').should('be.visible')
  })

  it("should return to home page", () => {
    cy.get(':nth-child(1) > .btn').click()
    cy.get('._logo_1hlt4_19 > a').click()
      .then( () => cy.url().should('equal', Cypress.config('baseUrl')+'/')
    )
  })
})