import styles from "./Homepage.module.css";
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import Footer from "../components/Footer";

export default function Homepage() {
  return ( 
    <main className={styles.homepage}>
      <Nav />
      <section>
        <h1>
          Wherever You Travel
          <br />
          <span style={{color: '#FFA500', fontSize: '3.5rem'}}>WorldWise keeps track of your adventures</span>
        </h1>
        <h2>
          An amazing tool that tracks your footsteps into every city you explored.
          Let&apos;s share your unforgetable memories and experience with your friends.
        </h2>
        <Link to='/login' className='cta'>Start Tracking Now</Link>
      </section>
      <Footer />
    </main>  
  );
}
