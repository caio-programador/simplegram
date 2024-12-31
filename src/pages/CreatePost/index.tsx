import styles from './CreatePost.module.css'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Input from '../../components/Input'
import Message from '../../components/Message'
import Section from '../../components/Section'
import IPost from '../../interfaces/Post'
import { savePost } from '../../services/post.service'
import Loading from '../../components/Loading'

const CreatePost = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)

  const [urlError, setUrlError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const query = useQueryClient()
  const {mutate, isPending, data, error} = useMutation({
    mutationFn: savePost,
    onSuccess: () => query.invalidateQueries({queryKey: ['posts/getAll']})
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    try {
      new URL(imageUrlRef.current!.value)
      
      const newPost: IPost = {
        title: titleRef.current!.value,
        description: descriptionRef.current!.value,
        imageURL: imageUrlRef.current!.value
      }

      mutate(newPost)
      titleRef.current!.value = '' 
      descriptionRef.current!.value = '' 
      imageUrlRef.current!.value = '' 
      setMessage(data!)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUrlError("URL de imagem inválida")
    }


  }

  useEffect(() => {
    setTimeout(() => {
      setUrlError(null)
      setMessage(null)
    }, 2000)
  }, [isPending, error, message])
  return (
    <div className={styles.form}>
      <Section title='Crie seu post'>
        Poste o que tiver vontade aqui, compartilhe notícias interessantes
      </Section>
      <form onSubmit={handleSubmit}>
        <Input 
          id='title' 
          label='Título' 
          placeholder='Título do seu post...' 
          required 
          ref={titleRef}
          type='text'
          maxLength={100}
        />
        <Input 
          id='imageUrl' 
          label='Link da imagem' 
          placeholder='Link da imagem do seu post...' 
          required 
          ref={imageUrlRef}
          type='text'
        />
        <Input 
          id='description' 
          label='Descrição' 
          placeholder='Descrição do seu post...' 
          required 
          ref={descriptionRef}
          type='text'
          maxLength={1000}
        />
        <input className="btn" disabled={isPending} type="submit" value={isPending ? 'Aguarde' : 'Postar'} />
        {urlError && <Message msg={urlError} typeMsg='error' />}
        {error && <Message msg={error.message} typeMsg='error' />}
        {message && <Message msg={message} typeMsg='success' />}
        {isPending && <Loading/>}
      </form>
    
    </div>
  )
}

export default CreatePost