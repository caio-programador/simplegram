import { MemoryRouter } from "react-router"
import PostDetails from "."
import QueryClientProviderTest from "../../__test__/mocks/QueryClientProviderTest"
import IPost from "../../interfaces/Post"

describe("<PostDetails />", () => {
  const mockedPost: IPost = {
    id: "1",
    title: "Post 1",
    imageURL: "https://static.todamateria.com.br/upload/pl/an/planeta-terra-og.jpg?class=ogImageWide",
    description: "Teste"
  }

  it("should render the details of post", () => {

    cy.intercept("GET", "/posts/undefined", {statusCode: 200, body: mockedPost}).as("getOnePost")
    cy.mount(
      <QueryClientProviderTest>
        <MemoryRouter initialEntries={[`posts/${mockedPost.id}`]}>
         <PostDetails/>
        </MemoryRouter>
      </QueryClientProviderTest>
    )

    cy.contains(mockedPost.title).should("be.visible")
    cy.contains(mockedPost.description).should("be.visible")

    cy.get('img').should('have.attr', 'src', mockedPost.imageURL)
    cy.get('img').should('have.attr', 'alt', mockedPost.title)
    
  })

  it("should render an error message", () => {
    cy.intercept("GET", "/posts/undefined", {statusCode: 404}).as("getOnePost")
    cy.mount(
      <QueryClientProviderTest>
        <MemoryRouter initialEntries={[`posts/${mockedPost.id}`]}>
         <PostDetails/>
        </MemoryRouter>
      </QueryClientProviderTest>
    )
    cy.get(".error").should("be.visible")
  })
})