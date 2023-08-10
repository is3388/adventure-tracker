// Uses the same styles as Product
import styles from "./Product.module.css";
import Nav from "../components/Nav";

export default function Product() {
  return (
    <main className={styles.product}>
      <Nav />
      <section>
        <div>
          <h2>
            Introductory Offer
            <br />
            $5/month
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src="img-2.jpg" alt="a van heading to Grand Canyon" />
      </section>
    </main>
  );
}