import { render, screen } from "@testing-library/react"
import About from "../../pages/About"

describe("About Page", () => {
  it("Should render sections correctly", async () => {
    render(<About/>)
    const section1 = await screen.findByText('Quem somos?')
    const section2 = await screen.findByText('De onde surgimos?')

    expect(section1).toBeInTheDocument()
    expect(section2).toBeInTheDocument()
  })

  it("Should render values correctly", async () => {
    render(<About/>)
    
    const value1 = await screen.findByText('Segurança')
    const value2 = await screen.findByText('Disponibilidade')
    const value3 = await screen.findByText('Liberdade')

    expect(value1).toBeInTheDocument()
    expect(value2).toBeInTheDocument()
    expect(value3).toBeInTheDocument()
  })
  it("Should render incons correctly", () => {
    render(<About />);

    const securityIcon = screen.getByTestId("security-icon");
    const eventIcon = screen.getByTestId("event-icon");
    const libertyIcon = screen.getByTestId("liberty-icon");

    expect(securityIcon).toBeInTheDocument();
    expect(eventIcon).toBeInTheDocument();
    expect(libertyIcon).toBeInTheDocument();
  })
})