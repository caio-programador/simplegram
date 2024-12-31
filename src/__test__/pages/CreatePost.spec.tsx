import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import QueryClientProviderTest from "../mocks/QueryClientProviderTest"
import IPost from "../../interfaces/Post"
import { savePost } from "../../services/post.service"
import CreatePost from "../../pages/CreatePost"
import React from "react"


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
describe("CreatePost Page", () => {

  const mockMutate = jest.fn();
  const mockInvalidateQueries = jest.fn();

  let mockPost: IPost
  let mockMessage: string


  beforeEach(() => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate, isPending: false, data: mockMessage, error: null
    }));
    (useQueryClient as jest.Mock).mockImplementation(() => ({
      invalidateQueries: mockInvalidateQueries.mockImplementation(async () => {})
    }));
    (savePost as jest.Mock).mockImplementation(() => ({
      data: mockMessage
    }))
    jest.clearAllMocks()
    mockMessage = 'Post criado com sucesso'
    mockPost = {
      id: '1',
      title: 'Post 1',
      imageURL: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportSportsNews/tagreuters.com2023binary_LYNXMPEJ5B0PM-FILEDIMAGE-e1697726921338.jpg?w=420&h=240&crop=1&quality=85',
      description: 'Description of Post 1'
    }
    
  })

  it("should render create post correctly", async () => {
    render(
      <QueryClientProviderTest>
        <CreatePost/>
      </QueryClientProviderTest>
    )
    
    expect(await screen.findByText('Crie seu post')).toBeInTheDocument()
  })

  it('should render all form inputs and submit button', async () => {
    render(
      <QueryClientProviderTest>
        <CreatePost/>
      </QueryClientProviderTest>
    )
    expect(await screen.findByLabelText("Título:")).toBeInTheDocument();
    expect(await screen.findByLabelText("Link da imagem:")).toBeInTheDocument();
    expect(await screen.findByLabelText("Descrição:")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Postar" })).toBeInTheDocument();
  })

  it('should call mutate function when form is submitted with valid data', async () => {
    render(
      <QueryClientProviderTest>
        <CreatePost/>
      </QueryClientProviderTest>
    )
    fireEvent.change(screen.getByLabelText("Título:"), { target: { value: mockPost.title } });
    fireEvent.change(screen.getByLabelText("Link da imagem:"), { target: { value: mockPost.imageURL } });
    fireEvent.change(screen.getByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: "Postar" }));

    await waitFor(() => expect(mockMutate).toHaveBeenCalledWith({
      title: mockPost.title,
      description: mockPost.description,
      imageURL: mockPost.imageURL,
    }));

    expect(await screen.findByText(mockMessage)).toBeInTheDocument()
  })

  it("should display error message for invalid image URL", async () => {
    render(
      <QueryClientProviderTest>
        <CreatePost/>
      </QueryClientProviderTest>
    )

    fireEvent.change(screen.getByLabelText("Título:"), { target: { value: mockPost.title} });
    fireEvent.change(screen.getByLabelText("Link da imagem:"), { target: { value: "invalid-url" } });
    fireEvent.change(screen.getByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: 'Postar'}));

    expect(await screen.findByTestId('message')).toBeInTheDocument();
  });

  it("should disable the submit button while the mutation is pending", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate,
      isPending: true,
      data: null,
      error: null,
    }));

    render(
      <QueryClientProviderTest>
        <CreatePost/>
      </QueryClientProviderTest>
    );

    const submitButton = screen.getByRole("button", { name: 'Aguarde' });
    expect(submitButton).toBeDisabled();
  });

  it("should disable the submit button while the mutation is pending", async () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate,
      isPending: false,
      data: null,
      error: {message: "Erro ao criar o post"},
    }));

    render(
      <QueryClientProviderTest>
        <CreatePost/>
      </QueryClientProviderTest>
    );

    fireEvent.change(screen.getByLabelText("Título:"), { target: { value: mockPost.title } });
    fireEvent.change(screen.getByLabelText("Link da imagem:"), { target: { value: mockPost.imageURL } });
    fireEvent.change(screen.getByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: "Postar" }));

    expect(await screen.findByTestId('message')).toBeInTheDocument()
  });
  
  it("should clear the form after successful submission", async () => {
    render(
      <QueryClientProviderTest>
        <CreatePost />
      </QueryClientProviderTest>
    );
  
    const titleInput = screen.getByLabelText("Título:") as HTMLInputElement;
    const imageUrlInput = screen.getByLabelText("Link da imagem:") as HTMLInputElement;
    const descriptionInput = screen.getByLabelText("Descrição:") as HTMLInputElement;
  
    fireEvent.change(titleInput, { target: { value: mockPost.title } });
    fireEvent.change(imageUrlInput, { target: { value: mockPost.imageURL } });
    fireEvent.change(descriptionInput, { target: { value: mockPost.description } });
  
    fireEvent.click(screen.getByRole("button", { name: "Postar" }));
  
    await waitFor(() => {
      expect(titleInput.value).toBe("");
      expect(imageUrlInput.value).toBe("");
      expect(descriptionInput.value).toBe("");
    });
  });

  it("should clear error and success messages after 2 seconds", async () => {
    jest.useFakeTimers();
  
    render(
      <QueryClientProviderTest>
        <CreatePost />
      </QueryClientProviderTest>
    );
  
    fireEvent.change(screen.getByLabelText("Título:"), { target: { value: mockPost.title } });
    fireEvent.change(screen.getByLabelText("Link da imagem:"), { target: { value: "invalid-url" } });
    fireEvent.change(screen.getByLabelText("Descrição:"), { target: { value: mockPost.description } });
  
    fireEvent.click(screen.getByRole("button", { name: "Postar" }));
  
    expect(await screen.findByTestId("message")).toBeInTheDocument();
  
    // Avança o tempo para simular o setTimeout
    jest.runAllTimers();
  
    await waitFor(() => {
      expect(screen.queryByTestId("message")).not.toBeInTheDocument();
    });
  
    jest.useRealTimers();
  });


  it("should call useMutation with params: {mutationFn: savePost, onSuccess: () => query.invalidateQueries({queryKey: ['posts/getAll']})}", async () => {
    render(
      <QueryClientProviderTest>
        <CreatePost />
      </QueryClientProviderTest>
    );


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
      queryKey: ['posts/getAll']
    })

  })

  it("should [isPending, error, message] in dependency array of useEffect", () => {
    
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useEffect: jest.fn(),
    }))
    const mockUseEffect = jest.spyOn(React, 'useEffect');
    render(
      <QueryClientProviderTest>
        <CreatePost />
      </QueryClientProviderTest>
    );

    expect(mockUseEffect).toHaveBeenCalledWith(expect.any(Function), [
      expect.any(Boolean),
      expect.any(Object),
      expect.any(Object),
    ]);
  })
})