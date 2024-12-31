import styles from './Home.module.css'
import { IoIosHome } from 'react-icons/io'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../services/post.service'
import Message from '../../components/Message'
import Post from '../../components/Post'


const Home = () => {
  const {data: posts, error, isLoading} = useQuery({queryKey: ['posts/getAll'], queryFn: getPosts})
  if(isLoading)
    return <p>Carregando...</p>
  return (
    <div className={styles.home}>
      <h2><IoIosHome/> Veja os melhores posts dos mais diversos assuntos</h2>
      {error && <Message msg='Um erro ocorreu ao carregar os posts! Tente novamente mais tarde' typeMsg='error'/>}
      <div className={styles.posts}>
        {posts && posts.map(post => (
          <Post data-testid="post" post={post} key={post.id}/>
        ))}
      </div>
    </div>
  )
}

export default Home