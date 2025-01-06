import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import QueryClientProviderTest from "../mocks/QueryClientProviderTest"
import IPost from "../../interfaces/Post"
import { savePost } from "../../services/post.service"
import CreatePost from "../../pages/CreatePost"
import { MemoryRouter, useNavigate } from "react-router"


jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}))
jest.mock('../../config/db.config', () => ({
  URL: "https://mockURL.com"
}))
jest.mock("../../services/post.service", () => ({
  ...jest.requireActual('../../services/post.service'),
  savePost: jest.fn()
}))
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn()
}))

describe("CreatePost Page", () => {

  const mockMutate = jest.fn();
  const mockInvalidateQueries = jest.fn();
  const mockNavigate = jest.fn()

  let mockPost: IPost


  beforeEach(() => {
    
    mockPost = {
      id: '1',
      title: 'Post 1',
      imageURL: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportSportsNews/tagreuters.com2023binary_LYNXMPEJ5B0PM-FILEDIMAGE-e1697726921338.jpg',
      description: 'Description of Post 1'
    };

    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate, isPending: false, data: mockPost, error: null
    }));
    (useQueryClient as jest.Mock).mockImplementation(() => ({
      invalidateQueries: mockInvalidateQueries.mockImplementation(async () => {})
    }));
    (savePost as jest.Mock).mockImplementation(() => ({
      data: mockPost
    }));
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    jest.clearAllMocks()

    
    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <CreatePost />
        </MemoryRouter>
      </QueryClientProviderTest>
    );
    
  })

  it("should render create post correctly", async () => {
   expect(await screen.findByText('Crie seu post')).toBeInTheDocument()
  })


  it('should call mutate function when form is submitted with valid data', async () => {
    
    fireEvent.change(screen.getByLabelText("Título:"), { target: { value: mockPost.title } });
    fireEvent.change(screen.getByLabelText("Link da imagem:"), { target: { value: mockPost.imageURL } });
    fireEvent.change(screen.getByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: "Postar" }));

    await waitFor(() => expect(mockMutate).toHaveBeenCalledWith({
      title: mockPost.title,
      description: mockPost.description,
      imageURL: mockPost.imageURL,
    }));

  })

  it("should disable the submit button and show loading while the mutation is pending", async () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate,
      isPending: true,
      data: null,
      error: null,
    }));
    
    
    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <CreatePost />
        </MemoryRouter>
      </QueryClientProviderTest>
    );
    

    const submitButton = screen.getByDisplayValue("Aguarde");
    expect(submitButton).toBeDisabled();

    const loading = await screen.findByTestId('loading')
    expect(loading).toBeInTheDocument()
  });

  it("should show error message when there is an error at useMutation returns", async () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate,
      isPending: false,
      data: null,
      error: true
    }));

    render(
      <QueryClientProviderTest>
        <MemoryRouter>
          <CreatePost />
        </MemoryRouter>
      </QueryClientProviderTest>
    );

    const error = await screen.findByTestId('message')

    expect(error).toBeInTheDocument()

  });

  it("should call useMutation with params: {mutationFn: savePost, onSuccess: () => query.invalidateQueries({queryKey: ['posts/getAll']})}", async () => {
    expect(useMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationFn: expect.any(Function),
        onSuccess:  expect.any(Function)
      })
    )

    const mutationFn = (useMutation as jest.Mock).mock.calls[0][0].mutationFn
    const resultMutation = mutationFn()

    expect(resultMutation).toEqual(await savePost(mockPost));

    (useMutation as jest.Mock).mock.calls[0][0].onSuccess();

    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['posts/getAll', 'post/getOne']
    })

    expect(mockNavigate).toHaveBeenCalledWith('/')

  })

  it("should not show loading when isPending is False", () => {
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  
})