import { MemoryRouter } from "react-router"
import Home from "."
import QueryClientProviderTest from "../../__test__/mocks/QueryClientProviderTest"
import IPost from "../../interfaces/Post"


describe("<Home />", () => { 
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
    
  ] as IPost[]

  beforeEach(() => {
    cy.intercept('GET', 'api/v1/posts', {statusCode: 200, body: mockedPosts}).as("getAllPosts")
    cy.mount(
    <QueryClientProviderTest>
      <MemoryRouter>
        <Home/>
      </MemoryRouter>
    </QueryClientProviderTest>)
  })

  it("should render correctly", () => {
    cy.contains("Veja os melhores posts dos mais diversos assuntos")
  })

  it("should render post 1 and post 2", () => {
    cy.contains(mockedPosts[0].title).should("be.visible")
    cy.contains(mockedPosts[1].title).should("be.visible")
  })

  it("should the links have the correct url", () => {
    cy.get('.btn').each((el, index) => {
      cy.wrap(el).should('have.attr', 'href', '/posts/'+mockedPosts[index].id)
    })
  })

})