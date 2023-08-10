import { NavLink } from 'react-router-dom'; // NavLink shows the currently visited link with class of active
import styles from './Nav.module.css'
import Logo from './Logo'
export default function Nav() {
  return (
    <>
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/login' className={styles.ctaLink}>Login</NavLink>
        </li>
      </ul>
    </nav>
     
  </>
  );
}
