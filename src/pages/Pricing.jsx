// Uses the same styles as Product
import styles from "./Product.module.css";
import Nav from "../components/Nav";

export default function Pricing() {
  return (
    <main className={styles.product}>
      <Nav />
      <section>
        <div>
          <h2 style={{color: '#FFA500'}}>
            Introductory Offer
          </h2>            
          <h3 style={{color: '#FFA500'}}>
            $5/month or $60/year
          </h3>
          <p>
            The real time traker service provides location history with city name, country, timestamp plus a map with the exact position.
            It&apos;s only $5 per month and $60 per year.
          </p>
        </div>
        <img src="img-2.jpg" alt="a van heading to Grand Canyon" />
      </section>
    </main>
  );
}
