import styles from './CountryList.module.css'
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message='Add your first country by clicking on the city on the map' />
    );
  
  /* const countriesString = new Set(
    cities.map((city) =>
      JSON.stringify({ country: city.country, emoji: city.emoji })
    )
  );
   <ul className={styles.countryList}>
      {[...countriesString].map((country) => {
        const countryObj = JSON.parse(country);
        return <CountryItem country={countryObj} key={countryObj.country} />;
      })}
    </ul> */

  const countries = cities.reduce((arr, city) => {
    if(arr.map(el => el.country).includes(city.country)) 
    return arr
      
    else
    return [...arr, {country: city.country, emoji: city.emoji}]
      
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}