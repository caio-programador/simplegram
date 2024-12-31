import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { client } from "./MockQueryClient"

type QueryClientProviderTestProps = {
  children: ReactNode
}


const QueryClientProviderTest = ({children}: QueryClientProviderTestProps) => {
  
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryClientProviderTest