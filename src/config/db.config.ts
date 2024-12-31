export const URL = 'http://localhost:3000/posts/'

export type RequestMethod = 'POST' | 'DELETE' | 'PUT' | 'GET'

export type RequestConfig = {
  body?: string,
  method: RequestMethod,
  headers?: {
    "Content-Type"?: string
  }
}

export const requestConfig = <T>(method: RequestMethod, data?: T) => {
  let config: RequestConfig

  if(data && method === 'POST'){
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
  }else{
    config = {
      method,
    }
  }

  return config
}