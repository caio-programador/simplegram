import { render, screen } from "@testing-library/react"
import {userEvent} from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from "react-router"
import Post from "../../components/Post"
import IPost from "../../interfaces/Post"

describe("Post Component", () => {
  let mockPost: IPost

  beforeEach(() => {
    mockPost = {
      id: '1',
      title: 'Post 1',
      description: 'Post with this description',
      imageURL: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportSportsNews/tagreuters.com2023binary_LYNXMPEJ5B0PM-FILEDIMAGE-e1697726921338.jpg?w=420&h=240&crop=1&quality=85'
    }
  })

  it("should render Post correctly", async () => {
    render(<MemoryRouter>
      <Post post={mockPost}/>
    </MemoryRouter>)

    const img = await screen.findByRole("img")
    const title = await screen.findByText(mockPost.title)
    const link = await screen.findByRole('link')

    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', mockPost.title)
    expect(img).toHaveAttribute('src', mockPost.imageURL)
    
    expect(title).toBeInTheDocument()

    expect(link).toBeInTheDocument()

  })

  it("should open a details page from post", async () => {
    render(<MemoryRouter>
      <Routes>
        <Route path="/" element={<Post post={mockPost}/>} />
        <Route path="posts/:id" element={<p>Você quis ver este post detalhadamente</p>} />
      </Routes>
    </MemoryRouter>)

    
    const link = await screen.findByRole('link')
    await userEvent.click(link);

    expect(screen.getByText("Você quis ver este post detalhadamente")).toBeInTheDocument();
  })
})