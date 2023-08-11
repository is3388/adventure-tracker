import styles from './Sidebar.module.css';
import Logo from './Logo'
import AppNav from './AppNav'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

// Outlet will be replaced by child routes from App.js
export default function Sidebar() {
  return <div className={styles.sidebar}>
    <Logo />
    <AppNav />
    <Outlet />
    <Footer />
  </div>;
}
