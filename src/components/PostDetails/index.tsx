import { useParams } from 'react-router'
import styles from './PostDetails.module.css'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../../services/post.service'
import Message from '../Message'

const PostDetails = () => {
  const {id} = useParams()

  const {data: post, error, isLoading} = useQuery({queryKey: ['post/getOne'], queryFn: () => getPostById(id!)})

  if(isLoading)
    return <p>Carregando...</p>

  return (
    <>
      {post && (
        <div className={styles.post_details}>
          <img src={post.imageURL} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      )}
      {error && <Message msg={error.message} typeMsg='error' />}
    </>
  )
}

export default PostDetails