import { render, screen } from "@testing-library/react"
import Message from "../../components/Message"

describe("Message Component", () => {
  it("should render error message correctly", async () => {
    render(<Message msg={"Teste"} typeMsg="error" />)

    const msg = await screen.findByTestId("message")

    expect(msg).toBeInTheDocument()
    expect(msg).toHaveStyle({"background-color": "rgb(209, 161, 159);"})
  })

  it("should render success message correctly", async () => {
    render(<Message msg={"Teste"} typeMsg="success" />)

    const msg = await screen.findByTestId('message')

    expect(msg).toBeInTheDocument()
    expect(msg).toHaveStyle({"background-color": "rgb(139, 200, 119);"})
  })

  it("should have message class", async () => {
    render(<Message msg="Teste" typeMsg="error" />)

    const msg = await screen.findByTestId("message")

    expect(msg).toHaveClass('message')
  })
})