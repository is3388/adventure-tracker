import { useCities } from '../hooks/useCities';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
  
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

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const {currentCity, deleteCity} = useCities()

  function handleClick(e) {
    e.preventDefault()
    deleteCity(id)
  }


  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji ? flagemojiToPNG(emoji) : ""}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}onClick={handleClick} >&times;</button>
      </Link>
    </li>
  );
}
