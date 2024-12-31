import { Link } from 'react-router'
import styles from './Post.module.css'
import IPost from '../../interfaces/Post'

type PostProps = {
  post: IPost
}

const Post = ({post}: PostProps) => {
  return (
    <div className={styles.post}>
      <img src={post.imageURL} alt={post.title} />
      <h2>{post.title}</h2>
      <Link className='btn' to={`/posts/${post.id}`}>Ver mais</Link>
    </div>
  )
}

export default Post