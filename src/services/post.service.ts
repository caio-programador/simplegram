import { requestConfig, URL } from "../config/db.config";
import IPost from "../interfaces/Post";

export const getPosts = async () => {
  
  try {
    const config = requestConfig("GET")

    const response = await fetch(URL, config)

    if(!response.ok)
      throw Error(`Erro: ${response.status}: ${response.statusText}`)

    const data = await response.json()

    return data as IPost[]

  } catch (error) {
    console.log(error);
    throw error
  }
}

export const getPostById = async (id: string) => {
  
  try {
    const config = requestConfig("GET")

    const response = await fetch(URL + id, config)

    if(!response.ok)
      throw new Error(`Erro ${response.status}: Post ${response.statusText}`)

    const data = await response.json()

    return data as IPost
  } catch (error) {
    console.error("Erro ao buscar o post:", error)
    throw error
  }
} 

export const savePost = async (data: IPost) => {
  try {
    const config = requestConfig<IPost>("POST", data)

    const response = await fetch(URL, config)

    if(response.status != 201)
      throw Error(`Erro ${response.status}: ${response.statusText}`)

    return 'Post criado com sucesso'
    
  } catch (error) {
    console.log(error);
    throw error
  }
}