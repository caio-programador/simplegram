import { render, screen } from "@testing-library/react"
import Home from "../../pages/Home"
import { useQuery } from "@tanstack/react-query"
import IPost from "../../interfaces/Post"
import { MemoryRouter } from "react-router"
import { getPosts } from "../../services/post.service"


jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn()
}))

jest.mock("../../services/post.service", () => ({
  getPosts: jest.fn()
}))


jest.mock('../../config/db.config', () => ({
  URL: "https://mockURL.com"
}))

describe("Home Component", () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("Should render correctly",  () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: [], error: null, isLoading: false
    }))
    render(<Home/>)

  })

  it("Should render a loading message", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null, error: null, isLoading: true
    }))

    render(<Home/>)

    const el = screen.getByText("Carregando...")
    expect(el).toBeInTheDocument()
  })

  it("Should render a error message", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null, error: true, isLoading: false
    }))

    render(<Home/>)

    const el = screen.getByTestId("message")
    expect(el).toBeInTheDocument()
  })

  it("should render posts", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: [
        { 
          id: '1',
          title: 'Post 1',
          description: 'string',
          imageURL: 'string'
        },
        {
          id: '2',
          title: 'Post 2',
          description: 'string',
          imageURL: 'string'
        }
      ] as IPost[], error: null, isLoading: false
    }));
    
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const post1 = screen.getByText("Post 1")
    expect(post1).toBeInTheDocument()
    const post2 = screen.getByText("Post 2")
    expect(post2).toBeInTheDocument()
  })

  it("should call useQuery with params: {queryKey: ['posts/getAll'], queryFn: getPosts}", async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: [], error: null, isLoading: false
    }));
    (getPosts as jest.Mock).mockImplementation(() => [])
    render(<Home/>)


    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['posts/getAll'],
      queryFn: expect.any(Function)
    }))

    const result = await (useQuery as jest.Mock).mock.calls[0][0].queryFn()
    expect(result).toEqual(getPosts())
  })
})