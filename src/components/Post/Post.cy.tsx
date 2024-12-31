import { MemoryRouter } from "react-router"
import Post from "."
import IPost from "../../interfaces/Post"

describe("<Post/>", () => {
  const mockedPost: IPost = {
    id: '1',
    title: "Post 1",
    imageURL: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportSportsNews/tagreuters.com2023binary_LYNXMPEJ5B0PM-FILEDIMAGE-e1697726921338.jpg?w=420&h=240&crop=1&quality=85",
    description: "DESCRIÇÃO"
  }

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Post post={mockedPost}/>
      </MemoryRouter>
    )
  })

  it("should render the correct atributes for post", () => {
    cy.contains(mockedPost.title).should("be.visible")
    cy.get("img").should('have.attr', 'src', mockedPost.imageURL)
      .and('have.attr', 'alt', mockedPost.title)

    cy.get('.btn').should('have.attr', 'href', `/posts/${mockedPost.id}`)
  })
})