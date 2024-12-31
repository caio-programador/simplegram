import styles from './Loading.module.css'
import loading from '../../assets/loading.svg'

const Loading = () => {
  return (
    <div className={styles.loading} data-testid="loading">
      <img src={loading} alt="loading screen" className={styles.loader}/>
    </div>
  )
}

export default Loading