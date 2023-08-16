import { useCities } from "../hooks/useCities";
import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
 
  const {id} = useParams()
  
  // remove the code as using global state for City view and back to the CityList
  // with the URL construct, user can share the URL with friends or able to bookmark it
  //const [searchParams, setSearchParams] = useSearchParams() // query string and update query string
  //const lat = searchParams.get('lat')
  //const lng = searchParams.get('lng')
  const {getCity, currentCity, isLoading} = useCities()

   /* TEMP DATA
  const currentCity = {
    cityName: "Santorini",
    emoji: "😍",
    date: "2027-10-31T15:59:59.138Z",
    notes: "Unforgettable and fairytale destination!"
  }; */

  useEffect(() => {
    getCity(id)
  }, [id])
  const { cityName, date, notes } = currentCity;

  if (isLoading) return <Spinner />

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You visited {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your review</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
      <BackButton />
      </div>
    </div>
  );
}

export default City;
