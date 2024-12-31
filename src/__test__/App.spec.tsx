import {render, screen} from '@testing-library/react'
import App from '../App';
import QueryClientProviderTest from './mocks/QueryClientProviderTest';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue({
    data: [], error: null, isLoading: false
  })
}))

describe("App", () => {
  it('Should render the App', () => {
    render(
      <QueryClientProviderTest>
        <App />
      </QueryClientProviderTest>
    );
  })

  it('Should render container, navbar and footer correctly', () => {
    render(      
      <QueryClientProviderTest>
        <App />
      </QueryClientProviderTest>
    )

    const container = screen.getByTestId("container")
    const navbar = screen.getByRole('navigation')
    const footer = screen.getByText('Todos os direitos reservados')

    expect(container).toBeInTheDocument()
    expect(navbar).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })
})