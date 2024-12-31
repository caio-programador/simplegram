import { render, screen } from "@testing-library/react"
import Navbar from "../../components/Navbar"
import { MemoryRouter } from "react-router"

describe("Navbar Component", () => {

  it("shoul render navbar logo correctly", async () => {
    render(
      <MemoryRouter>
        <Navbar/>
      </MemoryRouter>
    )

    const logo = await screen.findByText('Simple')

    expect(logo).toBeInTheDocument()
  })


  it("should render navbar links correctly",  async () => {
    render(
      <MemoryRouter>
        <Navbar/>
      </MemoryRouter>
    )

    const home = await screen.findByText(/Home/i)
    const about = await screen.findByText(/Sobre/i)
    const post = await screen.findByText(/Postar/i)

    expect(home).toBeInTheDocument()
    expect(about).toBeInTheDocument()
    expect(post).toBeInTheDocument()
  })

  it("about link should have active class when is active", async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Navbar/>
      </MemoryRouter>
    )

    const about = await screen.findByText(/Sobre/i)

    expect(about).toHaveClass('active')

  })

  it("post link should have active class when is active", async () => {
    render(
      <MemoryRouter initialEntries={['/posts/create']}>
        <Navbar/>
      </MemoryRouter>
    )

    const post = await screen.findByText(/Postar/i)

    expect(post).toHaveClass('active')

  })

  it("home link should have active class when is active", async () => {
    render(
      <MemoryRouter>
        <Navbar/>
      </MemoryRouter>
    )

    const home = await screen.findByText(/Home/i)

    expect(home).toHaveClass('active')

  })

})