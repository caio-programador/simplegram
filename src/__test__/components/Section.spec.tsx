import { render, screen } from "@testing-library/react"
import Section from "../../components/Section"

describe("Section Component", () => {
  let sectionProps: {title: string, children: string}

  beforeEach(() => {
    sectionProps = {
      title: 'Teste',
      children: "Teste bem vindo"
    }
  })

  it("should render section correctly", async () => {
    render(<Section title={sectionProps.title}>
      {sectionProps.children}
    </Section>)

    const title = await screen.findByText(sectionProps.title)
    const children = await screen.findByText(sectionProps.children)

    expect(title).toBeInTheDocument()
    expect(children).toBeInTheDocument()
  })
})