import styles from "./Product.module.css";
import Nav from "../components/Nav";

export default function Product() {
  return (
    <main className={styles.product}>
      <Nav />
      <section>
        <img
          src="img-1.jpg"
          alt="scuba diver with coral reefs"
        />
        <div>
          <h2 style={{color: '#FFA500'}}>About WordWise</h2>
          <p>
          This adventure tracker app allows you to store data in regards to the places you visited. 
          Data including cities, dates of your trip and comments. It also comes with a map that clearly shows the geolocations with marker. 
          </p>
          <p>
            It is super easy. All you have to do is type in your destinated cities. Then, the corresponding cities will be shown on the map.
            You can add or delete the locations as you like.
          </p>
        </div>
      </section>
    </main>
  );
}
