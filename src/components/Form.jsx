// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import BackButton from "./BackButton";
import Message from './Message'
import Spinner from "./Spinner"
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from "../hooks/useCities";


function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
} 
// navigate(-1) // back 1 step in BrowserHistory

const flagemojiToPNG = (flag) => {
  // Convert flag emoji to corresponding country code
  const countryCode = [...flag]
    .map((char) =>
      String.fromCharCode(char.codePointAt() - 127397).toLowerCase()
    )
    .join("");

  // Return an image element with the country's flag
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [emoji, setEmoji] = useState('')
  const {createCity} = useCities()
  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

  useEffect(() => {
    if (!lat && !lng) return; // prevent calling API
     //console.log(lat, lng)
    async function fetchCityData() {
      try {
        setIsLoading(true)
        setError('') // reset error
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        console.log(data)

        if (!data.countryCode) throw new Error('Not a valid city. Please click somewhere else 😉')
        setCityName(data.city || data.locality || '')
        setCountry(data.countryName || '')
        setEmoji(convertToEmoji(data.countryCode))
        
      }
      catch(err) {
        setError(err.message)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    console.log(lat, lng)
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity); // update both UI state and remote state
    navigate("/app/cities");
  }

  if (isLoading) return <Spinner />
  if (error) return <Message message={error} />
  if (!lat && !lng) return <Message message='Start clicking on the map' />

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji ? flagemojiToPNG(emoji) : ""}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="MM/dd/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
