import { Link, NavLink } from "react-router"
import styles from './Navbar.module.css'
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to='/'>Simple<b>Gram</b></Link>
      </div>
      <div className={styles.link}>
        <NavLink to='/' >Home</NavLink>
        <NavLink to='/about'>Sobre</NavLink>
        <NavLink to='/posts/create'>Postar</NavLink>
      </div>
    </nav>
  )
}

export default Navbar