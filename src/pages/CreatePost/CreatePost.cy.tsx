import CreatePost from "."
import QueryClientProviderTest from "../../__test__/mocks/QueryClientProviderTest"
import IPost from "../../interfaces/Post"


describe('<CreatePost/>', () => {
  const mockPost: IPost = {
    title: "Post 1",
    imageURL: "https://static.todamateria.com.br/upload/pl/an/planeta-terra-og.jpg?class=ogImageWide",
    description: "Teste"
  }

  beforeEach(() => {
    cy.intercept('POST', '/posts', {statusCode: 201}).as("getAllPosts")
    cy.mount(
      <QueryClientProviderTest>
        <CreatePost/>
      </QueryClientProviderTest>
    )
  })

  it("should render correctly", () => {
    cy.contains("Crie seu post").should("be.visible")
  })

  it("should render all inputs", () => {
    cy.contains("Título").should("be.visible")
    cy.contains("Link da image").should("be.visible")
    cy.contains("Descrição").should("be.visible")

    cy.get(".btn").should("be.visible")
  })

  it("should click at button and send the form", () => {
    cy.clock()
    cy.get("#title").type(mockPost.title)
    cy.get("#imageUrl").type(mockPost.imageURL, {delay: 0})
    cy.get("#description").type(mockPost.description)

    cy.get(".btn").click()

    cy.tick(2000)
  })

  it("should show error message when type a invalid image url", () => {
    cy.clock()
    cy.get("#title").type(mockPost.title)
    cy.get("#imageUrl").type("asd")
    cy.get("#description").type(mockPost.description)

    cy.get(".btn").click()
    cy.get(".error").should("be.visible")
    cy.tick(2000)
  })
})