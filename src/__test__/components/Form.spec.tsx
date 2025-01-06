import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react"
import Form from "../../components/Form"
import IPost from "../../interfaces/Post"

describe("Form Component", () => {
  const mockHandleSubmit = jest.fn()

  const mockPost: IPost = {
    id: "1",
    title: 'Post 1',
    description: "Teste de descrição",
    imageURL: "https://google.com/ney.jpg"
  }
  let props: RenderResult

  beforeEach(() => {
    props = render(<Form handleForm={mockHandleSubmit} isPending={false} />)
  })
  it("should render Form component correclty", async () => {
    
    expect(await screen.findByLabelText("Título:")).toBeInTheDocument();
    expect(await screen.findByLabelText("Link da imagem:")).toBeInTheDocument();
    expect(await screen.findByLabelText("Descrição:")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Postar" })).toBeInTheDocument();
  })

  it("should show error messages when type invalid data", async () => {
    
    fireEvent.change(await screen.findByLabelText("Título:"), { target: { value: "" } });
    fireEvent.change(await screen.findByLabelText("Link da imagem:"), { target: { value: "" } });
    fireEvent.change(await screen.findByLabelText("Descrição:"), { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: "Postar" }));

    expect(await screen.findAllByTestId('error_form')).toHaveLength(3)
    expect(await screen.findByText("O título é obrigatório")).toBeInTheDocument()
    expect(await screen.findByText("A descrição é obrigatória")).toBeInTheDocument()
    expect(await screen.findByText("O link da imagem é obrigatório")).toBeInTheDocument()
  })

  
  it("should display error message for invalid image URL", async () => {
    fireEvent.change(await screen.findByLabelText("Título:"), { target: { value: mockPost.title} });
    fireEvent.change(await screen.findByLabelText("Link da imagem:"), { target: { value: "invalid-url" } });
    fireEvent.change(await screen.findByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: 'Postar'}));

    expect(await screen.findByTestId('error_form')).toBeInTheDocument()
  });

  it("should display min lenght error for title and description", async () => {
    fireEvent.change(await screen.findByLabelText("Título:"), { target: { value: "as"} });
    fireEvent.change(await screen.findByLabelText("Link da imagem:"), { target: { value: mockPost.imageURL } });
    fireEvent.change(await screen.findByLabelText("Descrição:"), { target: { value: "as" } });

    fireEvent.click(screen.getByRole("button", { name: 'Postar'}));

    expect(await screen.findAllByTestId('error_form')).toHaveLength(2)
    expect(await screen.findByText("O título precisa ter no mínimo 3 caracteres")).toBeInTheDocument()
    expect(await screen.findByText("A descrição precisa ter no mínimo 3 caracteres")).toBeInTheDocument()
  })

  it("should display max lenght error for title", async () => {
    
    fireEvent.change(await screen.findByLabelText("Título:"), { target: { value: 'a'.repeat(102)} });
    fireEvent.change(await screen.findByLabelText("Link da imagem:"), { target: { value: mockPost.imageURL } });
    fireEvent.change(await screen.findByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: 'Postar'}));

    expect(await screen.findAllByTestId('error_form')).toHaveLength(1)
    expect(await screen.findByText("O título só pode ter no máximo 100 caracteres")).toBeInTheDocument()
  })

  it("should display nothing when type valid data", async () => {
    fireEvent.change(await screen.findByLabelText("Título:"), { target: { value: mockPost.title} });
    fireEvent.change(await screen.findByLabelText("Link da imagem:"), { target: { value: mockPost.imageURL } });
    fireEvent.change(await screen.findByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: 'Postar'}));

    expect(screen.queryAllByTestId('error_form')).toHaveLength(0)
    
    expect(await screen.findByLabelText("Título:")).not.toHaveStyle({'border-bottom-color': '#c52722', 'color': '#c52722'})
    expect(await screen.findByLabelText("Link da imagem:")).not.toHaveStyle({'border-bottom-color': '#c52722', 'color': '#c52722'})
    expect(await screen.findByLabelText("Descrição:")).not.toHaveStyle({'border-bottom-color': '#c52722', 'color': '#c52722'})

    expect(screen.queryByText("O título só pode ter no máximo 100 caracteres")).not.toBeInTheDocument()
    expect(screen.queryByText("O título é obrigatório")).not.toBeInTheDocument()
    expect(screen.queryByText("O link da imagem é obrigatório")).not.toBeInTheDocument()
    expect(screen.queryByText("A descrição é obrigatória")).not.toBeInTheDocument()
    expect(screen.queryByText("O título precisa ter no mínimo 3 caracteres")).not.toBeInTheDocument()
    expect(screen.queryByText("A descrição precisa ter no mínimo 3 caracteres")).not.toBeInTheDocument()
    
  })

  it("should call handleForm function", async () => {
    fireEvent.change(await screen.findByLabelText("Título:"), { target: { value: mockPost.title} });
    fireEvent.change(await screen.findByLabelText("Link da imagem:"), { target: { value: mockPost.imageURL } });
    fireEvent.change(await screen.findByLabelText("Descrição:"), { target: { value: mockPost.description } });

    fireEvent.click(screen.getByRole("button", { name: 'Postar'}));
    await waitFor(() =>expect(mockHandleSubmit).toHaveBeenCalled())
  })

  it("should disable the submit button", async () => {
    props.rerender(<Form handleForm={mockHandleSubmit} isPending={true} />)

    const button = await screen.findByText('Aguarde')

    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it("should correctly apply border_error class only when errors exist", async () => {
  
    // Clica no botão "Postar" sem preencher os campos
    fireEvent.click(screen.getByRole("button", { name: 'Postar' }));
  
    // Espera os estilos serem aplicados
    await waitFor(() => {
      // Verifica os estilos do campo "Título"
      expect(screen.getByLabelText("Título:")).toHaveStyle({
        'border-bottom-color': '#c52722',
        color: '#c52722',
      });
  
      // Verifica os estilos do campo "Link da imagem"
      expect(screen.getByLabelText("Link da imagem:")).toHaveStyle({
        'border-bottom-color': '#c52722',
        color: '#c52722',
      });
  
      // Verifica os estilos do campo "Descrição"
      expect(screen.getByLabelText("Descrição:")).toHaveStyle({
        'border-bottom-color': '#c52722',
        color: '#c52722',
      });
    });
  });
  
  
  
})