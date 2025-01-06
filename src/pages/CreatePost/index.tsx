import styles from './CreatePost.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Message from '../../components/Message'
import Section from '../../components/Section'
import IPost from '../../interfaces/Post'
import { savePost } from '../../services/post.service'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router'
import Form from '../../components/Form'

const CreatePost = () => {
  const navigate = useNavigate()

  const query = useQueryClient()
  const {mutate, isPending, error} = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      query.invalidateQueries({queryKey: ['posts/getAll', 'post/getOne']})      
      navigate("/")
    }
  
  })

  const handleSubmit = (data: IPost) => {
    const newPost: IPost = {...data}

    mutate(newPost)
  }

  return (
    <div className={styles.form}>
      <Section title='Crie seu post'>
        Poste o que tiver vontade aqui, compartilhe notícias interessantes
      </Section>
      <Form handleForm={handleSubmit} isPending={isPending} />

      {error && <Message msg={error.message} typeMsg='error' />}
      {isPending && <Loading/>}
    
    </div>
  )
}

export default CreatePost