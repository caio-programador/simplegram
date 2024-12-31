import { render, screen } from "@testing-library/react"
import Input from "../../components/Input"

describe("Input Component", () => {
  let inputProps: {id: string, label: string}
  beforeEach(() => {
    inputProps = {
      id: "teste",
      label: "teste"
    }
  })

  it("should render input correctly", async () => {
    render(
      <Input 
        id={inputProps.id} 
        label={inputProps.label} 
        type="text" 
        placeholder={inputProps.label} />
    )

    const labelText = await screen.findByText(inputProps.label+":")
    const input = await screen.findByRole("textbox")

    expect(labelText).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("placeholder", inputProps.label)
    expect(input).toHaveAttribute("type", "text")
  })
})