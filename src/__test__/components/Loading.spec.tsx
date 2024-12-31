import { render, screen } from "@testing-library/react"
import Loading from "../../components/Loading"

describe("Loading Component", () => {

  it("should render loading correctly", async () => {
    render(<Loading/>)

    const el = await screen.findByTestId('loading')

    expect(el).toBeInTheDocument()
  })
})