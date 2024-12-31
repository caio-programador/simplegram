import { render, screen } from '@testing-library/react'
import PostDetails from "../../components/PostDetails"
import IPost from "../../interfaces/Post"
import { MemoryRouter, useParams } from 'react-router'
import QueryClientProviderTest from '../mocks/QueryClientProviderTest'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../../services/post.service'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn().mockReturnValue('1')
}))
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn()
}))
jest.mock("../../services/post.service", () => ({
  getPostById: jest.fn()
}))

jest.mock('../../config/db.config', () => ({
  URL: "https://mockURL.com"
}))

describe("PostDetails Component", () => {
  let mockPost: IPost

  beforeEach(() => {
    jest.clearAllMocks()
    mockPost = {
      id: '1',
      title: 'Post 1',
      description: 'Post with this description',
      imageURL: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportSportsNews/tagreuters.com2023binary_LYNXMPEJ5B0PM-FILEDIMAGE-e1697726921338.jpg?w=420&h=240&crop=1&quality=85'
    }
  })
  it("should render PostDetails correctly", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockPost, error: null, isLoading: false
    }))

    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <PostDetails/>
        </MemoryRouter>
      </QueryClientProviderTest>
    )

    
      const img = await screen.findByRole("img")
      const title = await screen.findByText(mockPost.title)
      const description = await screen.findByText(mockPost.description)

      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', mockPost.imageURL)
      expect(img).toHaveAttribute('alt', mockPost.title)

      expect(title).toBeInTheDocument()
      expect(description).toBeInTheDocument()
  })

  it("should render a loading message", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null, error: null, isLoading: true
    }))

    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <PostDetails/>
        </MemoryRouter>
      </QueryClientProviderTest>
    )
    const loading = await screen.findByText('Carregando...')

    expect(loading).toBeInTheDocument()
  })

  it("should render an error message", async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null, error: {message: "An error ocurred"}, isLoading: false
    }))

    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <PostDetails/>
        </MemoryRouter>
      </QueryClientProviderTest>
    )
    const errorMsg = await screen.findByTestId('message')

    expect(errorMsg).toBeInTheDocument()

  })

  it("should handle incomplete post data", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { title: 'Post 1' }, // Sem `description` ou `imageURL`
      error: null,
      isLoading: false,
    }));
  
    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <PostDetails />
        </MemoryRouter>
      </QueryClientProviderTest>
    );
  
    const title = await screen.findByText('Post 1');
    expect(title).toBeInTheDocument();
  
    const description = screen.queryByText(/description/i);
    expect(description).not.toBeInTheDocument();
  
    const img = screen.queryByRole('img');
    expect(img).not.toHaveAttribute("src", mockPost.imageURL);
  });

  it("should render error for invalid post id", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '9999' });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null, error: { message: "Post not found" }, isLoading: false
    }));
  
    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <PostDetails />
        </MemoryRouter>
      </QueryClientProviderTest>
    );
  
    const errorMsg = await screen.findByTestId("message");
    expect(errorMsg).toBeInTheDocument();
  });

  it("should handle unexpected post data format", async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { title: null, description: 123, imageURL: undefined },
      error: null,
      isLoading: false,
    }));
  
    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <PostDetails />
        </MemoryRouter>
      </QueryClientProviderTest>
    );
  
    const title = screen.queryByText("null");
    expect(title).not.toBeInTheDocument();
  
    const description = screen.queryByText("123");
    expect(description).toBeInTheDocument();
  
    const img = screen.queryByRole("img");
    expect(img).not.toHaveAttribute("src");
  });
  
  it("should call useQuery with {queryKey: ['post/getOne'], queryFn: () => getPostById(id!)} params", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockPost, error: null, isLoading: false
    }));
    (getPostById as jest.Mock).mockReturnValue(mockPost);

    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <PostDetails/>
        </MemoryRouter>
      </QueryClientProviderTest>
    )

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['post/getOne'],
        queryFn: expect.any(Function),
      })
    );

    // Opcional: Verifique se queryFn está chamando getPostById corretamente
    const queryFn = (useQuery as jest.Mock).mock.calls[0][0].queryFn;
    const result = queryFn()
    expect(result).toEqual(getPostById('1'))

       
  })

})