import { MemoryRouter } from "react-router"
import CreatePost from "."
import QueryClientProviderTest from "../../__test__/mocks/QueryClientProviderTest"
import IPost from "../../interfaces/Post"


describe('<CreatePost/>', () => {
  const mockPost: IPost = {
    title: "Post 1",
    imageURL: "https://static.todamateria.com.br/upload/pl/an/planeta-terra-og.jpg",
    description: "Teste"
  }

  beforeEach(() => {
    cy.intercept('POST', 'api/v1/posts', {statusCode: 201}).as("getAllPosts")
    cy.mount(
      <MemoryRouter>
        <QueryClientProviderTest>
          <CreatePost/>
        </QueryClientProviderTest>
      </MemoryRouter>
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
    cy.get("#title").type(mockPost.title)
    cy.get("#imageUrl").type(mockPost.imageURL, {delay: 0})
    cy.get("#description").type(mockPost.description)

    cy.get(".btn").click()

  })
})