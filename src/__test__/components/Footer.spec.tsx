import { render, screen } from "@testing-library/react"
import Footer from "../../components/Footer"

describe("Footer Component", () => {
  it("should render correctly Footer", async () => {
    render(<Footer/>)

    const rights = await screen.findByText("Todos os direitos reservados")
    
    expect(rights).toBeInTheDocument()

  })
})